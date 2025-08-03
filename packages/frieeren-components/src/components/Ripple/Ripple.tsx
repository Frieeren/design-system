import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import "./Ripple.scss";
import type { RippleProps, RippleState } from "./Ripple.type";

// Individual Ripple component
const RippleCircle = ({
  x,
  y,
  size,
  color = "rgba(0, 0, 0, 0.3)",
  duration = 550,
  onAnimationEnd
}: {
  x: number;
  y: number;
  size: number;
  color?: string;
  duration?: number;
  onAnimationEnd?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const rippleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const rippleElement = rippleRef.current;
    if (!rippleElement) return;

    // Start animation
    rippleElement.style.transform = "scale(0)";
    rippleElement.style.opacity = "0.1";

    // Force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    rippleElement.offsetHeight;

    // Trigger enter animation
    rippleElement.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    rippleElement.style.transform = "scale(1)";
    rippleElement.style.opacity = "0.3";

    // Start exit animation after a delay
    const exitTimer = setTimeout(() => {
      rippleElement.style.opacity = "0";

      // Remove after exit animation
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onAnimationEnd) onAnimationEnd();
      }, duration);

      return () => clearTimeout(removeTimer);
    }, 100);

    return () => clearTimeout(exitTimer);
  }, [duration, onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <span
      ref={rippleRef}
      className="ripple-circle"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        pointerEvents: "none",
        transform: "scale(0)",
        opacity: 0.1
      }}
    />
  );
};

// Custom hook for debounced cleanup
const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(), delay);
  }, [callback, delay]);

  useLayoutEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Main Ripple component
export const Ripple: React.FC<RippleProps> = ({
  color = "rgba(255, 255, 255, 0.9)",
  duration = 550,
  center = false,
  disabled = false,
  className = "",
  style = {}
}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const nextKey = useRef(0);

  // Debounced cleanup function
  const cleanupRipples = useDebounce(() => {
    setRipples([]);
  }, duration + 80);

  const addRipple = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      let rippleX: number;
      let rippleY: number;

      if (center) {
        // Center ripple
        rippleX = rect.width / 2;
        rippleY = rect.height / 2;
      } else {
        // Calculate position from click/touch point
        const clientX =
          "clientX" in event ? event.clientX : (event.touches && event.touches[0]?.clientX) || 0;
        const clientY =
          "clientY" in event ? event.clientY : (event.touches && event.touches[0]?.clientY) || 0;

        rippleX = clientX - rect.left;
        rippleY = clientY - rect.top;
      }

      // Calculate ripple size to cover the entire element
      const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2 + 2;
      const rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));

      const newRipple: RippleState = {
        id: nextKey.current++,
        x: rippleX,
        y: rippleY,
        size: rippleSize
      };

      setRipples(prev => [...prev, newRipple]);
      cleanupRipples();
    },
    [center, disabled, cleanupRipples]
  );

  const handleAnimationEnd = useCallback((key: number) => {
    setRipples(prev => prev.filter(ripple => ripple.id !== key));
  }, []);

  return (
    <span
      ref={containerRef}
      className={`ripple-layer ${className}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "auto",
        overflow: "hidden",
        borderRadius: "inherit",
        ...style
      }}
      onMouseDown={addRipple}
      onTouchStart={addRipple}
    >
      {ripples.map(ripple => (
        <RippleCircle
          key={ripple.id}
          x={ripple.x}
          y={ripple.y}
          size={ripple.size}
          color={color}
          duration={duration}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
    </span>
  );
};

export default Ripple;
