type WeekNumbersCountry = "kr" | "en";
type WeekNumbers = Record<WeekNumbersCountry, string[]>;
type HeaderTitle = Record<WeekNumbersCountry, string>;
type SlideDirection = "left" | "right";

type DateRange = {
  start: Date | null;
  end: Date | null;
};

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

type BaseCalendarProps = {
  minDate?: Date;
  maxDate?: Date;
  minMonth?: Date;
  maxMonth?: Date;
  initDate?: Date;
  activeTransition?: boolean;
  showWeekNumbers?: boolean;
  onlyViewMonthDays?: boolean;
  weekNumbersCountry?: WeekNumbersCountry;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type RangeCalendarProps = BaseCalendarProps & {
  enableRange: true;
  onRangeChange?: (range: DateRange) => void;
  onDateChange?: never;
};

type SingleCalendarProps = BaseCalendarProps & {
  enableRange?: false;
  onRangeChange?: never;
  onDateChange?: (date: Date) => void;
};

type CalendarProps = RangeCalendarProps | SingleCalendarProps;

type CalendarHeaderProps = {
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  disabledPrevMonth?: boolean;
  disabledNextMonth?: boolean;
  weekNumbersCountry: WeekNumbersCountry;
};

type TileSlotProps = {
  date?: Date;
  type: "day" | "week-number";
  conditions?: DateConditions;
  defaultContent: React.ReactNode;
};

type CalendarTileProps = {
  type: "day" | "week-number";
  conditions?: DateConditions;
  onClick?: () => void;
  children: React.ReactNode;
  date?: Date;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type CalendarDaysProps = {
  days: DayState[][];
  onDayClick: (date: Date) => void;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type CalendarWeekNumbersProps = {
  weekNumbersCountry: WeekNumbersCountry;
};

type CalendarSlideTransitionProps = {
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
  CalendarProps,
  CalendarHeaderProps,
  CalendarWeekNumbersProps,
  CalendarDaysProps,
  CalendarTileProps,
  CalendarSlideTransitionProps,
  TileSlotProps
};
