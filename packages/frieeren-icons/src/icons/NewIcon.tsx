import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgNewIcon = (
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
      d="M8.488 4.166c-.117-.52-.858-.52-.976 0l-.545 2.423a.5.5 0 0 1-.378.378l-2.423.545c-.52.118-.52.859 0 .976l2.423.546a.5.5 0 0 1 .378.378l.545 2.423c.118.52.859.52.976 0l.546-2.423a.5.5 0 0 1 .378-.378l2.423-.546c.52-.117.52-.858 0-.976l-2.423-.545a.5.5 0 0 1-.378-.378zm7 5c-.117-.52-.858-.52-.976 0L13.6 13.22a.5.5 0 0 1-.378.378l-4.055.913c-.52.117-.52.859 0 .976l4.055.913a.5.5 0 0 1 .378.378l.913 4.056c.117.52.859.52.976 0l.913-4.056a.5.5 0 0 1 .378-.378l4.056-.913c.52-.117.52-.858 0-.976l-4.056-.913a.5.5 0 0 1-.378-.378z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgNewIcon);
export default ForwardRef;
