import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSearchIcon = (
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.01 16.053a6.38 6.38 0 0 0 1.984-4.625c0-3.55-2.908-6.428-6.497-6.428S5 7.878 5 11.428s2.909 6.429 6.497 6.429a6.5 6.5 0 0 0 4.513-1.804m0 0L20 20"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSearchIcon);
export default ForwardRef;
