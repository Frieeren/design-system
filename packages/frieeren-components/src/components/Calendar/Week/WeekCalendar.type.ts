import type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  SlideDirection,
  BaseDateConditions,
  BaseDayState,
  BaseCalendarProps,
  BaseCalendarHeaderProps,
  BaseCalendarTileProps,
  BaseCalendarWeekNumbersProps
} from "../shared/types";

type WeekDateConditions = BaseDateConditions;

type WeekDayState = BaseDayState;

type TileSlotProps = {
  /** 날짜 객체 (day 타입일 때만 제공) */
  date?: Date;
  /** 타일 유형 */
  type: "day" | "week-number";
  /** 날짜 조건들 */
  conditions?: WeekDateConditions;
  /** 기본 타일 내용 */
  defaultContent: React.ReactNode;
};

type WeekCalendarProps = BaseCalendarProps & {
  /** 날짜 선택 변경 핸들러 */
  onDateChange?: (date: Date) => void;
  /** 커스텀 타일 렌더링 함수 */
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarHeaderProps = BaseCalendarHeaderProps;

type WeekCalendarTileProps = BaseCalendarTileProps & {
  /** 날짜 조건들 */
  conditions?: WeekDateConditions;
  /** 날짜 객체 (tileSlot에서 사용) */
  date?: Date;
  /** 커스텀 타일 렌더링 함수 */
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarDaysProps = {
  /** 주 캘린더의 날짜 상태 배열 (주별로 그룹화) */
  days: WeekDayState[][];
  /** 날짜 클릭 핸들러 */
  onDayClick: (date: Date) => void;
  /** 커스텀 타일 렌더링 함수 */
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarWeekNumbersProps = BaseCalendarWeekNumbersProps;

export type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  SlideDirection,
  WeekDateConditions,
  WeekDayState,
  TileSlotProps,
  WeekCalendarProps,
  WeekCalendarHeaderProps,
  WeekCalendarWeekNumbersProps,
  WeekCalendarDaysProps,
  WeekCalendarTileProps
};
