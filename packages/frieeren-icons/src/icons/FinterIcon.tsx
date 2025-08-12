import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFinterIcon = (
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
      strokeWidth={1.5}
      d="M12 9a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0m6 0h9M6 9H3M12 16a3 3 0 1 0 6 0m-6 0a3 3 0 1 1 6 0m-6 0H3m15 0h3"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgFinterIcon);
export default ForwardRef;
