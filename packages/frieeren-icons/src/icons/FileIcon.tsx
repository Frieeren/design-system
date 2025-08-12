import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFileIcon = (
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
      d="m14 10-4 4"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m16 13 2-2a3.536 3.536 0 0 0 0-5v0a3.536 3.536 0 0 0-5 0l-2 2m-3 3-2 2a3.536 3.536 0 0 0 0 5v0a3.536 3.536 0 0 0 5 0l2-2"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgFileIcon);
export default ForwardRef;
