import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgQuestionIcon = (
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
      d="M4.75 12a7.25 7.25 0 1 1 14.5 0 7.25 7.25 0 0 1-14.5 0M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5m-1.107 9.543q-.124.433-.123 1.137v.129h1.546v-.13q0-.403.1-.685.105-.28.31-.492t.551-.416q.615-.369.938-.856.328-.492.328-1.183 0-.71-.357-1.225a2.2 2.2 0 0 0-.985-.797Q12.574 8 11.754 8a3.4 3.4 0 0 0-1.389.275q-.615.27-.984.82-.369.546-.381 1.342h1.664q.012-.328.164-.562a1 1 0 0 1 .393-.363q.24-.123.521-.13.287.007.516.13.235.117.369.34.135.216.135.503a1 1 0 0 1-.229.663q-.234.286-.662.568a2.7 2.7 0 0 0-.621.51 1.8 1.8 0 0 0-.357.697m-.176 2.443a.9.9 0 0 0-.123.487.95.95 0 0 0 .123.498q.134.222.363.357a1 1 0 0 0 .979 0q.222-.135.357-.357a.96.96 0 0 0 0-.985 1 1 0 0 0-.357-.357.997.997 0 0 0-1.342.357"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgQuestionIcon);
export default ForwardRef;
