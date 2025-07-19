import { CSSProperties } from "react";
import { BoxProps } from "../Box";

export interface GridProps extends BoxProps {
  columns?: number | string;
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  autoFlow?: CSSProperties["gridAutoFlow"];
  areas?: CSSProperties["gridTemplateAreas"];
}
