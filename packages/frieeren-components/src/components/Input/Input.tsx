import { forwardRef, useState } from "react";
import cx from "classnames";
import { InputProps } from "./input.type";
import CloseIcon from "./assets/close.svg";
import LinkIcon from "./assets/link.svg";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      accept,
      display = "box",
      disabled = false,
      validate,
      onClear,
      className,
      value,
      onChange,
      placeholder = "텍스트를 입력하세요",
      ...rest
    },
    ref
  ) => {
    const [hasFile, setHasFile] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "file") {
        setHasFile(!!(e.target.files && e.target.files.length > 0));
      }

      if (onChange) {
        onChange(e);
      }
    };

    const getErrorMessage = (): string => {
      if (validate && value !== undefined) {
        const validationError = validate(String(value));
        if (validationError !== null) {
          return validationError;
        }
      }
      return "";
    };

    const errorMessage = getErrorMessage();
    const hasError = !!errorMessage;

    return (
      <div
        className={cx(
          "input-wrapper",
          {
            [`input--display-${display}`]: display,
            "input--disabled": disabled,
            "input--error": hasError
          },
          className
        )}
      >
        <div className="input-container">
          <input
            placeholder={placeholder}
            ref={ref}
            type={type}
            disabled={disabled}
            className={cx("input", { "has-file": hasFile })}
            data-frieeren-component="Input"
            onChange={handleChange}
            value={value}
            {...rest}
          />
          {type === "file" && (
            <button className="input--action input--action-link" disabled={disabled}>
              <LinkIcon />
            </button>
          )}
          {value && onClear && (
            <button onClick={onClear} className="input--close" disabled={disabled}>
              <CloseIcon />
            </button>
          )}
        </div>
        {errorMessage && <span className="input--error-message">{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
