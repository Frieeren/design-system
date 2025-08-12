import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMoonIcon = (
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
      d="M16.113 3.501c.103-.4.671-.4.774 0l.477 1.848a.4.4 0 0 0 .287.287l1.848.476c.4.104.4.672 0 .775l-1.848.477a.4.4 0 0 0-.287.287l-.477 1.847c-.103.4-.671.4-.774 0l-.477-1.847a.4.4 0 0 0-.287-.287L13.5 6.887c-.4-.103-.4-.671 0-.775l1.848-.476a.4.4 0 0 0 .287-.287zm2.92 15.115A8.5 8.5 0 0 1 10.952 4.06 9.001 9.001 0 0 0 12 22a8.98 8.98 0 0 0 7.033-3.384m2.854-7.115c-.103-.4-.671-.4-.774 0l-.272 1.053a.4.4 0 0 1-.287.287l-1.052.272c-.4.103-.4.67 0 .774l1.052.271a.4.4 0 0 1 .287.288l.272 1.052c.103.4.671.4.774 0l.272-1.052a.4.4 0 0 1 .287-.287l1.052-.272c.4-.103.4-.671 0-.774l-1.052-.272a.4.4 0 0 1-.287-.287z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgMoonIcon);
export default ForwardRef;
