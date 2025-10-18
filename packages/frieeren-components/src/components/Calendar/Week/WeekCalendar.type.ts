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
  /** 날짜 객체 */
  date?: Date;
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

/**
 * 주 캘린더 훅 타입
 * @description 주 캘린더 컴포넌트에서 사용하는 훅 타입
 */
type UseWeekCalendarProps = {
  initDate?: Date;
  onDateChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  minMonth?: Date;
  maxMonth?: Date;
};

/**
 * 주 캘린더 날짜 상태 생성 타입
 * @description 주 캘린더 날짜 상태 생성 타입
 */
type CreateWeekDateStateProps = {
  date: Date;
  selectedDate: Date;
  minDate?: Date;
  maxDate?: Date;
};

export type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  SlideDirection,
  WeekDateConditions,
  WeekDayState,
  WeekCalendarProps,
  WeekCalendarHeaderProps,
  WeekCalendarWeekNumbersProps,
  WeekCalendarDaysProps,
  WeekCalendarTileProps,
  UseWeekCalendarProps,
  CreateWeekDateStateProps
};
