export type RadioProps = {
  options: {
    label: React.ReactNode;
    value: string;
  }[];
  defaultValue?: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
  disabled?: boolean;
};
