export interface TimeValue {
  hour: number;
  minute: number;
}

export interface TimePickerProps {
  /** 선택된 시간 값 */
  value?: TimeValue;
  /** 시간 변경 시 호출되는 콜백 함수 */
  onChange?: (time: TimeValue) => void;
  /** 24시간 형식 사용 여부 (기본값: true) */
  use24Hour?: boolean;
  /** 분 단위 간격 (기본값: 1) */
  minuteStep?: number;
  /** 컴포넌트 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 최소 시간 */
  minTime?: TimeValue;
  /** 최대 시간 */
  maxTime?: TimeValue;
}

export interface WheelPickerProps {
  /** 표시할 값들의 배열 */
  values: (string | number)[];
  /** 현재 선택된 값의 인덱스 */
  selectedIndex: number;
  /** 값 변경 시 호출되는 콜백 함수 */
  onChange: (index: number, value: string | number) => void;
  /** 휠의 높이 (기본값: 200px) */
  height?: number;
  /** 각 아이템의 높이 (기본값: 40px) */
  itemHeight?: number;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
}

export type AmPm = "AM" | "PM";

export interface TimePickerState {
  hour: number;
  minute: number;
  ampm?: AmPm;
}
