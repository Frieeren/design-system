import * as SelectBase from "@radix-ui/react-select";
import classNames from "classnames";
import { SelectProps } from "./Select.type";

const Root = ({ className, ...props }: SelectProps) => {
  return (
    <div className={classNames("select", className)}>
      <SelectBase.Root data-frieeren-component="Select" {...props} />
    </div>
  );
};

const Trigger = ({ ...props }: SelectBase.SelectTriggerProps) => {
  return <SelectBase.Trigger data-frieeren-component="SelectTrigger" {...props} />;
};

const Portal = ({ ...props }: SelectBase.SelectPortalProps) => {
  return <SelectBase.Portal data-frieeren-component="SelectPortal" {...props} />;
};

const Content = ({ ...props }: SelectBase.SelectContentProps) => {
  return <SelectBase.Content data-frieeren-component="SelectContent" {...props} />;
};

const Viewport = ({ ...props }: SelectBase.SelectViewportProps) => {
  return <SelectBase.Viewport data-frieeren-component="SelectViewport" {...props} />;
};

const Group = ({ ...props }: SelectBase.SelectGroupProps) => {
  return <SelectBase.Group data-frieeren-component="SelectGroup" {...props} />;
};

const Item = ({ ...props }: SelectBase.SelectItemProps) => {
  return <SelectBase.Item data-frieeren-component="SelectItem" {...props} />;
};

const Label = ({ ...props }: SelectBase.SelectLabelProps) => {
  return <SelectBase.Label data-frieeren-component="SelectLabel" {...props} />;
};

const ItemText = ({ ...props }: SelectBase.SelectItemTextProps) => {
  return <SelectBase.ItemText data-frieeren-component="SelectItemText" {...props} />;
};

const Value = ({ ...props }: SelectBase.SelectValueProps) => {
  return <SelectBase.Value data-frieeren-component="SelectValue" {...props} />;
};

export default {
  Root,
  Trigger,
  Portal,
  Content,
  Viewport,
  Group,
  Item,
  Label,
  ItemText,
  Value
};
