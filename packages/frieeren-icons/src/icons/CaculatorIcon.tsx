import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCaculatorIcon = (
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
      d="M1.25 4A2.75 2.75 0 0 1 4 1.25h16A2.75 2.75 0 0 1 22.75 4v16A2.75 2.75 0 0 1 20 22.75H4A2.75 2.75 0 0 1 1.25 20V4M4 2.75c-.69 0-1.25.56-1.25 1.25v7.25h8.5v-8.5zm8.75 8.5h8.5V4c0-.69-.56-1.25-1.25-1.25h-7.25zm8.5 1.5h-8.5v8.5H20c.69 0 1.25-.56 1.25-1.25zM4 21.25h7.25v-8.5h-8.5V20c0 .69.56 1.25 1.25 1.25m3-17a.75.75 0 0 1 .75.75v1.25H9a.75.75 0 0 1 0 1.5H7.75V9a.75.75 0 0 1-1.5 0V7.75H5a.75.75 0 0 1 0-1.5h1.25V5A.75.75 0 0 1 7 4.25m-.884 10.806a.75.75 0 0 0-1.06 1.06l.883.884-.883.884a.75.75 0 1 0 1.06 1.06L7 18.062l.884.884a.75.75 0 0 0 1.06-1.061L8.062 17l.884-.884a.75.75 0 1 0-1.061-1.06L7 15.939zM14.25 7a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 9a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 2a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCaculatorIcon);
export default ForwardRef;
