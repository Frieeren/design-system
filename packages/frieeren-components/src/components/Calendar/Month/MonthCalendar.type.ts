type WeekNumbersCountry = "kr" | "en";
type WeekNumbers = Record<WeekNumbersCountry, string[]>;
type HeaderTitle = Record<WeekNumbersCountry, string>;
type SlideDirection = "left" | "right";
type DateRange = { start: Date | null; end: Date | null };

type DateConditions = {
  isToday: boolean;
  isWeekend: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isOtherMonth: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isOnlyViewMonthDays: boolean;
};

type DayState = {
  date: Date;
  conditions: DateConditions;
};

type BaseMonthCalendarProps = {
  minDate?: Date;
  maxDate?: Date;
  minMonth?: Date;
  maxMonth?: Date;
  initDate?: Date;
  activeTransition?: boolean;
  showWeekNumbers?: boolean;
  onlyViewMonthDays?: boolean;
  weekNumbersCountry?: WeekNumbersCountry;
};

type RangeMonthCalendarProps = BaseMonthCalendarProps & {
  enableRange: true;
  onRangeChange?: (range: DateRange) => void;
  onDateChange?: never;
};

type SingleMonthCalendarProps = BaseMonthCalendarProps & {
  enableRange?: false;
  onRangeChange?: never;
  onDateChange?: (date: Date) => void;
};

type MonthCalendarProps = RangeMonthCalendarProps | SingleMonthCalendarProps;

type MonthCalendarHeaderProps = {
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  disabledPrevMonth?: boolean;
  disabledNextMonth?: boolean;
  weekNumbersCountry: WeekNumbersCountry;
};

type MonthCalendarTileProps = {
  type: "day" | "week-number";
  conditions?: DateConditions;
  onClick?: () => void;
  children: React.ReactNode;
};

type MonthCalendarDaysProps = {
  days: DayState[][];
  onDayClick: (date: Date) => void;
};

type MonthCalendarWeekNumbersProps = {
  weekNumbersCountry: WeekNumbersCountry;
};

type MonthCalendarSlideTransitionProps = {
  children: React.ReactElement;
  transitionKey: string;
  slideDirection: SlideDirection;
  activeTransition: boolean;
};

export type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  DateRange,
  DayState,
  DateConditions,
  SlideDirection,
  MonthCalendarProps,
  MonthCalendarHeaderProps,
  MonthCalendarWeekNumbersProps,
  MonthCalendarDaysProps,
  MonthCalendarTileProps,
  MonthCalendarSlideTransitionProps
};
