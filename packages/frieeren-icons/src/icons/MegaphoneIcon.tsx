import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMegaphoneIcon = (
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
      d="M11 7.8H4v6.4h3.5M11 7.8v6.4m0-6.4L17.3 4v4.5M11 14.2l6.3 3.8v-4.5m-6.3.7H7.5m0 0 2.5 5.3m7.3-11v5m0-5 1.183.924a2 2 0 0 1 0 3.152L17.3 13.5"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgMegaphoneIcon);
export default ForwardRef;
