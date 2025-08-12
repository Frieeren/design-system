import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSms3Icon = (
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
      d="M16.496 6.152 5.703 8.195l5.359 2.345zm-4.459 5.528 1.72 5.992 3.887-10.52zm7.748-5.992a1.093 1.093 0 0 0-1.229-1.453L4.13 6.966c-1.056.2-1.22 1.645-.235 2.075l6.66 2.915 2.104 7.323c.29 1.015 1.71 1.068 2.075.077z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSms3Icon);
export default ForwardRef;
