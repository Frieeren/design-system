import * as CheckboxBase from "@radix-ui/react-checkbox";
import classNames from "classnames";

const Root = ({ className, ...props }: CheckboxBase.CheckboxProps) => {
  return (
    <CheckboxBase.Root
      className={classNames("checkbox", className)}
      data-frieeren-component="Checkbox"
      {...props}
    />
  );
};

const Indicator = ({ ...props }: CheckboxBase.CheckboxIndicatorProps) => {
  <CheckboxBase.Indicator data-frieeren-component="CheckboxIndicator" {...props} />;
};

export default {
  Root,
  Indicator
};
