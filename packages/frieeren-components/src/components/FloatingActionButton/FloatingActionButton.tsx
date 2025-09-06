import cx from "classnames";
import { Button } from "../Button";
import { ButtonTypes } from "../Button/Button.type";

type FloatingActionButtonProps = {
  size: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  position?: "fixed" | "absolute";
  top?: React.CSSProperties["top"];
  left?: React.CSSProperties["left"];
  bottom?: React.CSSProperties["bottom"];
  right?: React.CSSProperties["right"];
  backgroundColor?: React.CSSProperties["backgroundColor"];
};

export function FloatingActionButton({
  loading = false,
  disabled = false,
  size = "large",
  children,
  className,
  position = "fixed",
  top,
  left,
  bottom = 16,
  right = 16,
  backgroundColor
}: FloatingActionButtonProps) {
  const style: React.CSSProperties = { position };
  if (top !== undefined) style.top = top;
  if (left !== undefined) style.left = left;
  if (bottom !== undefined) style.bottom = bottom;
  if (right !== undefined) style.right = right;

  return (
    <div
      className={cx(
        "floating-action-button",
        {
          [`floating-action-button--size-${size}`]: size
        },
        className
      )}
      data-frieeren-component="floating-action-button"
      style={style}
    >
      <Button
        borderRadius="50%"
        loading={loading}
        disabled={disabled}
        type="base"
        backgroundColor={backgroundColor}
      >
        {children}
      </Button>
    </div>
  );
}
