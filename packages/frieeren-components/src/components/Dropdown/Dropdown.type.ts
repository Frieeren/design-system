export type DropdownProps = {
  label: string;
  items: {
    label: string;
    value: string;
  }[];
  className?: string;
  onOpenChange?: (open: boolean) => void;
  onClick?: (value: { label: string; value: string }) => void;
};
