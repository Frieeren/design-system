"use client";

import React, { forwardRef } from "react";
import cx from "classnames";
import { ButtonProps, LogButtonProps } from "./Button.type";
import { useLog } from "../Log/LogProvider";
import { createLogId } from "../Log/createLogId";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "base",
      display = "inline",
      disabled = false,
      loading = false,
      size = "md",
      className,
      children,
      color,
      backgroundColor,
      borderColor,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        data-frieeren-component="Button"
        className={cx(
          "button",
          {
            [`button--size-${size}`]: size,
            [`button--type-${type}`]: type,
            [`button--display-${display}`]: display
          },
          { disabled: disabled },
          className
        )}
        disabled={disabled || loading}
        style={{ color, backgroundColor, borderColor }}
        {...rest}
      >
        <span className={cx("button--content", { "button--content--hidden": loading })}>
          {children}
        </span>
        {loading && (
          <span className="button--loading">
            <div className="button--loading-dot"></div>
            <div className="button--loading-dot"></div>
            <div className="button--loading-dot"></div>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

const LogButton = forwardRef<HTMLButtonElement, LogButtonProps>(
  ({ onClick, children, logParams, ...props }, ref) => {
    const context = useLog();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const logId = createLogId({ logType: "event", eventType: "click" });
      context.logClient?.log("event", {
        logId,
        params: {
          button: children as string,
          ...context.logParams,
          ...logParams
        }
      });

      onClick?.(event);
    };

    return (
      <Button ref={ref} {...props} onClick={handleClick}>
        {children}
      </Button>
    );
  }
);

LogButton.displayName = "LogButton";

export { LogButton };
