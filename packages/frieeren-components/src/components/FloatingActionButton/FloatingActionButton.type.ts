export type FloatingActionButtonAction = {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export type FloatingActionButtonProps = {
  className?: string;
  disabled?: boolean;
  position?: "fixed" | "absolute";
  top?: React.CSSProperties["top"];
  left?: React.CSSProperties["left"];
  bottom?: React.CSSProperties["bottom"];
  right?: React.CSSProperties["right"];
  actions?: FloatingActionButtonAction[];
  icon?: React.ReactNode;
  onClick?: () => void;
};
