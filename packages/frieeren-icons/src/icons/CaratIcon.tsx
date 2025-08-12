import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCaratIcon = (
  {
    size = 24,
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string,
  },
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="m12.4 16.467 5-6.667A.5.5 0 0 0 17 9H7a.5.5 0 0 0-.4.8l5 6.667a.5.5 0 0 0 .8 0"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCaratIcon);
export default ForwardRef;
