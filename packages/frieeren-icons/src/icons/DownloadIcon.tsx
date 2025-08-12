import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgDownloadIcon = (
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
      d="M17.78 11.28a.75.75 0 1 0-1.06-1.06L13 13.94V4.25a.75.75 0 0 0-1.5 0v9.69l-3.72-3.72a.75.75 0 1 0-1.06 1.06l5 5a.75.75 0 0 0 1.06 0zm-1.035 8.884a.75.75 0 0 0 0-1.5h-8.99a.75.75 0 1 0 0 1.5z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgDownloadIcon);
export default ForwardRef;
