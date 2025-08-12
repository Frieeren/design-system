import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgErrorIcon = (
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
      d="M6 3.25A2.75 2.75 0 0 0 3.25 6v12A2.75 2.75 0 0 0 6 20.75h12A2.75 2.75 0 0 0 20.75 18V6A2.75 2.75 0 0 0 18 3.25zM4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v12c0 .69-.56 1.25-1.25 1.25H6c-.69 0-1.25-.56-1.25-1.25zm9.69 2.44a.5.5 0 0 1 .706 0l.354.353.353-.354a.5.5 0 1 1 .707.707l-.353.354.353.354a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.5.5 0 0 1-.707-.707l.354-.354-.354-.354a.5.5 0 0 1 0-.707m-5.794 6.206a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1-.708.708L15 15.707l-.646.647a.5.5 0 0 1-.708 0L13 15.707l-.646.647a.5.5 0 0 1-.708 0L11 15.707l-.646.647a.5.5 0 0 1-.708 0L9 15.707l-.646.647a.5.5 0 0 1-.708-.708zM7.44 8.44a.5.5 0 0 1 .707 0l.353.354.354-.354a.5.5 0 0 1 .707.707l-.354.354.354.354a.5.5 0 0 1-.707.707l-.354-.354-.353.354a.5.5 0 0 1-.707-.707l.353-.354-.353-.354a.5.5 0 0 1 0-.707"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgErrorIcon);
export default ForwardRef;
