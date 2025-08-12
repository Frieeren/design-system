import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSms1Icon = (
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
      d="M3.75 8c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25h-1.392v2.198l-1.6-1.927-.224-.271H5c-.69 0-1.25-.56-1.25-1.25zM5 5.25A2.75 2.75 0 0 0 2.25 8v6A2.75 2.75 0 0 0 5 16.75h10.08l1.816 2.189c.747.9 2.212.372 2.212-.798v-1.393A2.75 2.75 0 0 0 21.75 14V8A2.75 2.75 0 0 0 19 5.25zm2 7.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m6.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSms1Icon);
export default ForwardRef;
