import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgWarningIcon = (
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
      fillRule="evenodd"
      d="M13.733 5c-.77-1.333-2.694-1.333-3.464 0L4.206 15.5c-.77 1.333.193 3 1.733 3h12.124c1.54 0 2.502-1.667 1.732-3zM12 8.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 6a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0V15a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgWarningIcon);
export default ForwardRef;
