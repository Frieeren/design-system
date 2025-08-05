type WeekNumbersCountry = "kr" | "en";
type WeekNumbers = Record<WeekNumbersCountry, string[]>;
type SlideDirection = "left" | "right";
type DateConditions = {
  isToday: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isOtherMonth: boolean;
}
type DayState = {
  date: Date;
  conditions: DateConditions;
};

type CalendarProps = {
  minDate?: Date;
  maxDate?: Date;
  initDate?: Date;
  activeTransition?: boolean;
  onlyViewMonthDays?: boolean;
  weekNumbersCountry?: WeekNumbersCountry;
}

type CalendarHeaderProps = {
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

type CalendarTileProps = {
	type: "day" | "week-number";
  conditions?: DateConditions;
  onClick?: () => void;
  children: React.ReactNode;
}

type CalendarDaysProps = {
	days: DayState[][];
  onDayClick: (date: Date) => void;
}

type CalendarWeekNumbersProps = {
	weekNumbersCountry: WeekNumbersCountry;
}

type CalendarSlideTransitionProps = {
	children: React.ReactElement;
	transitionKey: string;	
	slideDirection: SlideDirection;
	activeTransition: boolean;
}

export type { 
	WeekNumbers,
	WeekNumbersCountry,
	DayState,
	SlideDirection,
	CalendarProps,
	CalendarHeaderProps,
	CalendarWeekNumbersProps,
	CalendarDaysProps,
	CalendarTileProps,
	CalendarSlideTransitionProps,
};