import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFormcloseIcon = (
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
    viewBox="0 0 16 16"
    width={size}
    height={size}
    ref={ref}
    {...props}
  >
    <rect width={16} height={16} fill="#F6F7F9" rx={8} />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.997 5.29a.5.5 0 0 0-.707.707L7.293 8 5.29 10.004a.5.5 0 1 0 .707.707L8 8.708l2.004 2.003a.5.5 0 0 0 .707-.707L8.707 8l2.004-2.003a.5.5 0 0 0-.707-.707L8 7.293z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgFormcloseIcon);
export default ForwardRef;
