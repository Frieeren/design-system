import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgRefreshIcon = (
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
      d="M6.126 10.914a5.25 5.25 0 0 1 9.876-.036l-3.287-1.324-.56 1.391 4.372 1.762.696.28.28-.695 1.762-4.373-1.392-.56-.856 2.125a6.75 6.75 0 1 0-1.786 8.51l-.925-1.182a5.25 5.25 0 0 1-8.18-5.898"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgRefreshIcon);
export default ForwardRef;
