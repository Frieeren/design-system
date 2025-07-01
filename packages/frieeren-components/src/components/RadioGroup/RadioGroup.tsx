import * as RadioGroupBase from "@radix-ui/react-radio-group";
import classNames from "classnames";

function Root({ className, ...props }: RadioGroupBase.RadioGroupProps) {
  return (
    <RadioGroupBase.Root
      className={classNames("radio-group", className)}
      data-frieeren-component="RadioGroup"
      {...props}
    />
  );
}

const Item = ({ children, value, ...props }: RadioGroupBase.RadioGroupItemProps) => {
  return <RadioGroupBase.Item value={value} data-frieeren-component="RadioGroupItem" {...props} />;
};

const Indicator = ({ ...props }: RadioGroupBase.RadioGroupIndicatorProps) => {
  return <RadioGroupBase.Indicator data-frieeren-component="RadioGroupIndicator" {...props} />;
};

export default {
  Root,
  Item,
  Indicator
};
