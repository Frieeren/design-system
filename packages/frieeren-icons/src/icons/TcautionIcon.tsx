import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTcautionIcon = (
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
      d="M11.133 4.504a1 1 0 0 1 1.737 0l8 14A1 1 0 0 1 20 19.998h-16a1 1 0 0 1-.868-1.496zm-.152 4.657a1.02 1.02 0 0 1 2.042 0v4.146a1.02 1.02 0 0 1-2.042 0zm1.02 8.26c.565 0 1.022-.462 1.022-1.031 0-.57-.457-1.031-1.021-1.031s-1.02.461-1.02 1.031.456 1.031 1.02 1.031"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTcautionIcon);
export default ForwardRef;
