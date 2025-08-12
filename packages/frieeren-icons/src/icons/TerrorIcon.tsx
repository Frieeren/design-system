import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTerrorIcon = (
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
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M7.293 16.707a1 1 0 0 1 0-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTerrorIcon);
export default ForwardRef;
