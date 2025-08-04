import React, { useState, useLayoutEffect } from "react";
import "./Ripple.scss";
import type {
  RippleProps,
  RippleState,
  DebounceRippleProps
} from "./Ripple.type";

const useDebouncedRippleCleanUp = ({
  duration,
  rippleCount,
  cleanUpFunction
}: DebounceRippleProps) => {
  useLayoutEffect(() => {
    let bounce: NodeJS.Timeout | null = null;
    if (rippleCount > 0) {
      if (bounce) {
        clearTimeout(bounce);
      }

      bounce = setTimeout(() => {
        cleanUpFunction();
        if (bounce) {
          clearTimeout(bounce);
        }
      }, duration * 4);
    }

    return () => {
      if (bounce) {
        clearTimeout(bounce);
      }
    };
  }, [rippleCount, duration, cleanUpFunction]);
};

export const Ripple = ({
  color = "rgba(255, 255, 255, 0.5)",
  duration = 850,
  center = false,
  disabled = false,
  className = "",
  style = {}
}: RippleProps) => {
  const [rippleArray, setRippleArray] = useState<RippleState[]>([]);

  useDebouncedRippleCleanUp({
    duration,
    rippleCount: rippleArray.length,
    cleanUpFunction: () => {
      setRippleArray([]);
    }
  });

  const addRipple = (event: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;

    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;

    let x: number;
    let y: number;

    if (center) {
      // Center ripple
      x = (rippleContainer.width - size) / 2;
      y = (rippleContainer.height - size) / 2;
    } else {
      // Calculate position from click/touch point
      const clientX = "clientX" in event ? event.clientX : (event.touches && event.touches[0]?.clientX) || 0;
      const clientY = "clientY" in event ? event.clientY : (event.touches && event.touches[0]?.clientY) || 0;

      x = clientX - rippleContainer.x - size / 2;
      y = clientY - rippleContainer.y - size / 2;
    }

    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <span
      className={`ripple-layer ${className}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      style={{
        ...style
      }}
      onMouseDown={addRipple}
      onTouchStart={addRipple}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={`ripple-${index}`}
              className="ripple-circle"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
                animationDuration: `${duration}ms`
              }}
            />
          );
        })}
    </span>
  );
};

export default Ripple;
