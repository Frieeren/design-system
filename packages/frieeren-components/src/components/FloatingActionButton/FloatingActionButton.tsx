import { useState } from "react";
import cx from "classnames";
import { FloatingActionButtonProps } from "./FloatingActionButton.type";

export function FloatingActionButton({
  disabled = false,
  className,
  position = "fixed",
  top,
  left,
  bottom = 16,
  right = 16,
  actions = [],
  icon,
  onClick
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const style: React.CSSProperties = { position };
  if (top !== undefined) style.top = top;
  if (left !== undefined) style.left = left;
  if (bottom !== undefined) style.bottom = bottom;
  if (right !== undefined) style.right = right;

  return (
    <div
      className={cx("floating-action-button", className)}
      data-frieeren-component="floating-action-button"
      style={style}
    >
      <button
        className={cx("floating-action-button--button")}
        style={{
          backgroundColor: "#3A8DFF"
        }}
        disabled={disabled}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          onClick?.();
        }}
      >
        {icon}
      </button>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          bottom: "76px",
          right: "0",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "all 0.3s ease-in-out"
        }}
      >
        {actions?.map((action, index) => (
          <div
            key={index}
            style={{
              transform: isOpen ? "translateY(0)" : `translateY(${40 - index * 20}px)`,
              transition: "transform 0.3s ease-in-out",
              transitionDelay: isOpen ? `${(index + 1) * 0.1}s` : "0s"
            }}
          >
            <button
              className={cx(
                "floating-action-button--button",
                "floating-action-button--action-button"
              )}
              disabled={action.disabled}
              type="button"
              onClick={() => {
                action.onClick?.();
                setIsOpen(false);
              }}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
