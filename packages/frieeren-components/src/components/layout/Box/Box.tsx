import classnames from "classnames";
import { BoxProps } from "./Box.type";
import { getSpacingStyle } from "../../../utils/getSpacingStyle";

export function Box({
  as: Component = "div",
  className,
  style,
  width,
  height,
  display = "inline-block",
  children,
  ...rest
}: BoxProps) {
  const { m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py, ...props } = rest;

  const spacingStyle = getSpacingStyle({
    m,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py
  });

  return (
    <Component
      data-frieeren-component="Box"
      className={classnames("box", className)}
      style={{
        width,
        height,
        display,
        ...spacingStyle,
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
