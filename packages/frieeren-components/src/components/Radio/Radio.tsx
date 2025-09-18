import * as RadioGroupBase from "@radix-ui/react-radio-group";
import { RadioProps } from "./Radio.type";
import "./Radio.scss";

export function Radio({ options, defaultValue, onChange, disabled = false }: RadioProps) {
  return (
    <RadioGroupBase.Root
      defaultValue={defaultValue}
      onChange={onChange}
      data-frieeren-component="Radio"
      disabled={disabled}
      className="RadioContainer"
    >
      {options.map(option => (
        <div className="RadioWrapper" key={option.value}>
          <RadioGroupBase.Item
            className="RadioItem"
            value={option.value}
            id={`radio-${option.value}`}
          >
            <div className="RadioIndicator" />
            <RadioGroupBase.Indicator />
          </RadioGroupBase.Item>
          <label className="RadioLabel" aria-disabled={disabled} htmlFor={`radio-${option.value}`}>
            <div className="RadioLabelText">{option.label}</div>
          </label>
        </div>
      ))}
    </RadioGroupBase.Root>
  );
}
