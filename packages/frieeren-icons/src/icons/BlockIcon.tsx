import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgBlockIcon = (
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
    <circle cx={9.895} cy={8.684} r={3.684} fill="currentColor" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.474}
      d="m15.438 9.684 4.51 4.51M19.947 9.684l-4.51 4.51"
    />
    <path
      fill="currentColor"
      d="M15.157 17.808c.34-.077.544-.43.394-.745-.407-.848-1.075-1.593-1.941-2.155-1.066-.691-2.372-1.066-3.715-1.066-1.344 0-2.65.375-3.715 1.066-.866.562-1.535 1.307-1.941 2.155-.151.315.053.668.393.745 3.465.785 7.06.785 10.525 0"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBlockIcon);
export default ForwardRef;
