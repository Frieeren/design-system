import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgWriteIcon = (
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
      d="M16.472 3.47a.75.75 0 0 1 1.06 0l2.4 2.4a.75.75 0 1 1-1.06 1.06l-2.4-2.4a.75.75 0 0 1 0-1.06m-1.628 3.033a.05.05 0 0 0-.071 0l-5.884 6.044a.1.1 0 0 0-.012.022l-.548 2.04v.001l-.168.63.629-.169 2.03-.544a.1.1 0 0 0 .023-.014l5.891-6.05a.05.05 0 0 0 0-.07zm-1.146-1.045a1.55 1.55 0 0 1 2.207-.015l1.89 1.89c.6.599.606 1.57.014 2.177l-5.891 6.05c-.195.2-.44.343-.71.416l-2.03.544-1.476.396H7.7A.994.994 0 0 1 6.485 15.7l.395-1.478.548-2.041a1.55 1.55 0 0 1 .386-.68zM4.8 20.15a1.55 1.55 0 0 1-1.55-1.55V5.8c0-.856.694-1.55 1.55-1.55h6.4a.75.75 0 0 1 0 1.5H4.8a.05.05 0 0 0-.05.05v12.8c0 .027.022.05.05.05h12.8a.05.05 0 0 0 .05-.05v-6.4a.75.75 0 0 1 1.5 0v6.4a1.55 1.55 0 0 1-1.55 1.55z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgWriteIcon);
export default ForwardRef;
