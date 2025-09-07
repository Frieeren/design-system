import { forwardRef } from "react";
import { Switch as SwitchBase } from "radix-ui";
import cx from "classnames";
import { SwitchProps } from "./Switch.type";

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, defaultValue = false, onChange, disabled = false, value }, ref) => {
    return (
      <SwitchBase.Root
        ref={ref}
        defaultChecked={defaultValue}
        onCheckedChange={onChange}
        checked={value}
        className={cx("switch", className)}
        data-frieeren-component="Switch"
        disabled={disabled}
        aria-disabled={disabled}
      >
        <SwitchBase.Thumb className="switch-thumb" />
      </SwitchBase.Root>
    );
  }
);

Switch.displayName = "Switch";
