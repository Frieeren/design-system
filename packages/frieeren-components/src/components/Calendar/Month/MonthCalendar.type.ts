import type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  DateRange,
  BaseDateConditions,
  BaseCalendarProps,
  BaseCalendarHeaderProps,
  BaseCalendarTileProps,
  BaseCalendarWeekNumbersProps
} from "../shared/types";

type MonthDateConditions = BaseDateConditions & {
  /** 범위 선택 시작 날짜 여부 */
  isRangeStart: boolean;
  /** 범위 선택 종료 날짜 여부 */
  isRangeEnd: boolean;
  /** 범위 선택 중간 날짜 여부 */
  isInRange: boolean;
  /** 현재 월의 날짜만 표시 모드 여부 */
  isOnlyViewMonthDays: boolean;
};

type MonthDayState = {
  /** 날짜 객체 */
  date: Date;
  /** 해당 날짜의 상태 조건들 (Range 기능 포함) */
  conditions: MonthDateConditions;
};

type BaseMonthCalendarProps = BaseCalendarProps & {
  /** 현재 월의 날짜만 표시할지 여부 */
  onlyViewMonthDays?: boolean;
};

type RangeMonthCalendarProps = BaseMonthCalendarProps & {
  /** 범위 선택 모드 활성화 */
  enableRange: true;
  /** 범위 선택 변경 핸들러 */
  onRangeChange?: (range: DateRange) => void;
  /** 단일 날짜 선택 핸들러 (범위 모드에서는 사용 불가) */
  onDateChange?: never;
};

type SingleMonthCalendarProps = BaseMonthCalendarProps & {
  /** 범위 선택 모드 비활성화 */
  enableRange?: false;
  /** 범위 선택 변경 핸들러 (단일 모드에서는 사용 불가) */
  onRangeChange?: never;
  /** 단일 날짜 선택 핸들러 */
  onDateChange?: (date: Date) => void;
};

type MonthCalendarProps = RangeMonthCalendarProps | SingleMonthCalendarProps;

type MonthCalendarHeaderProps = BaseCalendarHeaderProps;

type MonthCalendarTileProps = BaseCalendarTileProps & {
  /** 날짜 조건들 (Range 기능 포함) */
  conditions?: MonthDateConditions;
};

type MonthCalendarDaysProps = {
  /** 월 캘린더의 날짜 상태 배열 (주별로 그룹화) */
  days: MonthDayState[][];
  /** 날짜 클릭 핸들러 */
  onDayClick: (date: Date) => void;
};

type MonthCalendarWeekNumbersProps = BaseCalendarWeekNumbersProps;

export type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  DateRange,
  MonthDateConditions,
  MonthDayState,
  MonthCalendarProps,
  MonthCalendarHeaderProps,
  MonthCalendarWeekNumbersProps,
  MonthCalendarDaysProps,
  MonthCalendarTileProps
};
