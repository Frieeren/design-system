import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCloseIcon = (
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
      d="M6.874 5.813a.75.75 0 1 0-1.06 1.06L10.94 12l-5.127 5.127a.75.75 0 0 0 1.06 1.06L12 13.061l5.127 5.126a.75.75 0 1 0 1.06-1.06L13.061 12l5.127-5.127a.75.75 0 0 0-1.061-1.06L12 10.939z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCloseIcon);
export default ForwardRef;
