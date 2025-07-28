export type LogScreenParams = {
  title: string;
  [key: string]: string | number | boolean;
};

export type LogClickParams = {
  button: string;
  [key: string]: string | number | boolean;
};

export type LogPopupParams = {
  type: "toast" | "popup";
  message: string;
  [key: string]: string | number | boolean;
};
