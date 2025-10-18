type WeekNumbersCountry = "kr" | "en";
type WeekNumbers = Record<WeekNumbersCountry, string[]>;
type HeaderTitle = Record<WeekNumbersCountry, string>;
type SlideDirection = "left" | "right";

type DateConditions = {
  isToday: boolean;
  isWeekend: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isOtherMonth: boolean;
};

type DayState = {
  date: Date;
  conditions: DateConditions;
};

type WeekCalendarProps = {
  minDate?: Date;
  maxDate?: Date;
  minMonth?: Date;
  maxMonth?: Date;
  initDate?: Date;
  onDateChange?: (date: Date) => void;
  activeTransition?: boolean;
  showWeekNumbers?: boolean;
  weekNumbersCountry?: WeekNumbersCountry;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarHeaderProps = {
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

type WeekCalendarTileProps = {
  type: "day" | "week-number";
  conditions?: DateConditions;
  onClick?: () => void;
  children: React.ReactNode;
  date?: Date;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarDaysProps = {
  days: DayState[][];
  onDayClick: (date: Date) => void;
  tileSlot?: (props: TileSlotProps) => React.ReactNode;
};

type WeekCalendarWeekNumbersProps = {
  weekNumbersCountry: WeekNumbersCountry;
};

export type {
  WeekNumbers,
  HeaderTitle,
  WeekNumbersCountry,
  DayState,
  DateConditions,
  SlideDirection,
  WeekCalendarProps,
  WeekCalendarHeaderProps,
  WeekCalendarWeekNumbersProps,
  WeekCalendarDaysProps,
  WeekCalendarTileProps,
  TileSlotProps
};
