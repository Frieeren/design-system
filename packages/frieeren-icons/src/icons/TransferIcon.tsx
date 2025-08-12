import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTransferIcon = (
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
      d="M15.118 11.21a.75.75 0 1 0 1.042 1.08l3.11-3a.75.75 0 0 0 0-1.08l-3.11-3a.75.75 0 0 0-1.042 1.08L16.892 8H4.75l-.001.75V8a.75.75 0 0 0 0 1.5v-.75.75h12.142zm-6.736 7a.75.75 0 0 1-1.041 1.08l-3.112-3a.75.75 0 0 1 0-1.08l3.112-3a.75.75 0 1 1 1.04 1.08L6.609 15H18.75l.001.75v.75H6.608zm10.368-2.46v.75a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTransferIcon);
export default ForwardRef;
