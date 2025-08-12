import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCopyIcon = (
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
      d="M10.333 3.583a.75.75 0 0 0 0 1.5h9a.25.25 0 0 1 .25.25v8.333a.75.75 0 1 0 1.5 0V5.333a1.75 1.75 0 0 0-1.75-1.75zM6 6.25A1.75 1.75 0 0 0 4.25 8v10c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 17.75 18V8A1.75 1.75 0 0 0 16 6.25zM5.75 8A.25.25 0 0 1 6 7.75h10a.25.25 0 0 1 .25.25v10a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCopyIcon);
export default ForwardRef;
