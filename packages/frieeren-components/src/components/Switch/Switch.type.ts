export interface SwitchProps {
  className?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  defaultValue?: boolean;
  value?: boolean;
}
