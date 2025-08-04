import React from "react";

export interface RippleProps {
  /** 리플 효과 색상 */
  color?: string;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
  /** 중앙에서 시작하는 리플 효과 여부 */
  center?: boolean;
  /** 리플 효과 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

export interface RippleState {
  /** 클릭한 X 좌표 */
  x: number;
  /** 클릭한 Y 좌표 */
  y: number;
  /** 리플 크기 */
  size: number;
}

export interface DebounceRippleProps {
  /** 리플 효과 배열 개수 */
  rippleCount: number;
  /** 리플 효과 지속 시간 */
  duration: number;
  /** 리플 효과 정리 함수 */
  cleanUpFunction: () => void;
}
