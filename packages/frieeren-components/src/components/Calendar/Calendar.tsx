import cx from "classnames";
import { memo, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, isToday, isSameDay, addMonths, subMonths, isWeekend, isAfter } from "date-fns";
import {
  chunk,
  getDate,
  isCurrentMonth,
  getFormattedDate,
  currentMonthDays,
  isDisabledDay,
  isAfterMonth,
  isBeforeMonth,
  isDateInRange
} from "./utils";
import type {
  WeekNumbers,
  HeaderTitle,
  CalendarProps,
  SlideDirection,
  CalendarTileProps,
  CalendarDaysProps,
  CalendarHeaderProps,
  CalendarWeekNumbersProps,
  CalendarSlideTransitionProps,
  DateRange
} from "./Calendar.type";
import Ripple from "../Ripple/Ripple";
import LeftArrowIcon from "./assets/left-arrow.svg";
import RightArrowIcon from "./assets/right-arrow.svg";

const WEEK_NUMBERS: WeekNumbers = {
  kr: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["S", "M", "T", "W", "T", "F", "S"]
};

const HEADER_TITLE: HeaderTitle = {
  kr: "yyyy년 MM월",
  en: "MMMM yyyy"
};

const CalendarSlideTransition = ({
  children,
  transitionKey,
  slideDirection,
  activeTransition
}: CalendarSlideTransitionProps) => {
  if (!activeTransition) {
    return <div className="calendar--transition-container">{children}</div>;
  }

  const slideVariants = {
    enter: (direction: SlideDirection) => ({
      x: direction === "left" ? "100%" : "-100%",
      zIndex: 1
    }),
    center: {
      x: 0,
      zIndex: 1
    },
    exit: (direction: SlideDirection) => ({
      x: direction === "left" ? "-100%" : "100%",
      zIndex: 0
    })
  };

  return (
    <div className="calendar--transition-container">
      <AnimatePresence custom={slideDirection}>
        <motion.div
          key={transitionKey}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: [0.35, 0.8, 0.4, 1]
          }}
          className="calendar--slide-content"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%"
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Tile = memo(({ type, conditions, onClick, children }: CalendarTileProps) => {
  return (
    <button
      className={cx("calendar--tile", {
        "calendar--tile--day": type === "day",
        "calendar--tile--weekend": conditions?.isWeekend,
        "calendar--tile--week-number": type === "week-number",
        "calendar--tile--disabled": conditions?.isDisabled,
        "calendar--tile--today": conditions?.isToday,
        "calendar--tile--selected": conditions?.isSelected,
        "calendar--tile--other-month": conditions?.isOtherMonth,
        "calendar--tile--range-start": conditions?.isRangeStart,
        "calendar--tile--range-end": conditions?.isRangeEnd,
        "calendar--tile--in-range": conditions?.isInRange
      })}
      onClick={onClick}
    >
      {children}
      <span className="calendar--tile-day-background" />
      <Ripple center />
    </button>
  );
});

Tile.displayName = "Tile";

const Days = memo(({ days, onDayClick }: CalendarDaysProps) => {
  return (
    <div className="calendar--days-container">
      {days.map(week => (
        <div className="calendar--week-line" key={getFormattedDate(week[0].date)}>
          {week.map(state => {
            const date = state.date;
            const conditions = state.conditions;
            return (
              <Tile
                key={getFormattedDate(date)}
                type="day"
                onClick={() => onDayClick(date)}
                conditions={conditions}
              >
                {getDate(date)}
              </Tile>
            );
          })}
        </div>
      ))}
    </div>
  );
});

Days.displayName = "Days";

const WeakNumbers = memo(({ weekNumbersCountry }: CalendarWeekNumbersProps) => {
  return (
    <div className="calendar--week-numbers">
      {WEEK_NUMBERS[weekNumbersCountry].map((number, index) => (
        <Tile key={`week-number-${index}`} type="week-number">
          {number}
        </Tile>
      ))}
    </div>
  );
});

WeakNumbers.displayName = "WeakNumbers";

const Header = memo(
  ({
    selectedDate,
    onPrevMonth,
    onNextMonth,
    disabledPrevMonth,
    disabledNextMonth,
    weekNumbersCountry
  }: CalendarHeaderProps) => {
    return (
      <div className="calendar--header">
        <button
          className="calendar--header-button"
          onClick={onPrevMonth}
          disabled={disabledPrevMonth}
        >
          <LeftArrowIcon />
        </button>
        <div className="calendar--header-title">
          {format(selectedDate, HEADER_TITLE[weekNumbersCountry])}
        </div>
        <button
          className="calendar--header-button"
          onClick={onNextMonth}
          disabled={disabledNextMonth}
        >
          <RightArrowIcon />
        </button>
      </div>
    );
  }
);

Header.displayName = "Header";

const createDateState = (
  date: Date,
  currentMonth: Date,
  selectedDate: Date,
  selectedRange: DateRange,
  enableRange: boolean,
  minDate?: Date,
  maxDate?: Date,
  onlyViewMonthDays?: boolean
) => {
  const baseConditions = {
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isDisabled: isDisabledDay(date, minDate, maxDate),
    isOtherMonth: onlyViewMonthDays ? !isCurrentMonth(date, currentMonth) : false
  };

  if (enableRange) {
    const rangeConditions = isDateInRange(date, selectedRange);
    return {
      date,
      conditions: {
        ...baseConditions,
        ...rangeConditions
      }
    };
  } else {
    return {
      date,
      conditions: {
        ...baseConditions,
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isRangeStart: false,
        isRangeEnd: false,
        isInRange: false
      }
    };
  }
};

export const Calendar = ({
  minDate,
  maxDate,
  minMonth,
  maxMonth,
  initDate,
  enableRange = false,
  onDateChange,
  onRangeChange,
  activeTransition = true,
  showWeekNumbers = true,
  weekNumbersCountry = "kr",
  onlyViewMonthDays = true
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentMonthDays(currentMonth), [currentMonth]);

  const daysState = useMemo(() => {
    const state = days.map(day =>
      createDateState(
        day,
        currentMonth,
        selectedDate,
        selectedRange,
        enableRange,
        minDate,
        maxDate,
        onlyViewMonthDays
      )
    );
    return chunk(state, 7);
  }, [
    days,
    minDate,
    maxDate,
    currentMonth,
    selectedDate,
    selectedRange,
    onlyViewMonthDays,
    enableRange
  ]);

  const transitionKey = useMemo(() => format(currentMonth, "yyyy-MM"), [currentMonth]);
  const isDisabledPrevMonth = useMemo(
    () => minMonth && isBeforeMonth(currentMonth, minMonth),
    [minMonth, currentMonth]
  );
  const isDisabledNextMonth = useMemo(
    () => maxMonth && isAfterMonth(currentMonth, maxMonth),
    [maxMonth, currentMonth]
  );

  const handleRangeSelection = useCallback(
    (date: Date) => {
      const { start, end } = selectedRange;

      if (!start || (start && end)) {
        const newRange = { start: date, end: null };
        setSelectedRange(newRange);
        onRangeChange?.(newRange);
        return;
      }

      if (start && !end) {
        const newRange =
          isAfter(date, start) || isSameDay(date, start)
            ? { start, end: date }
            : { start: date, end: null };

        setSelectedRange(newRange);
        onRangeChange?.(newRange);
      }
    },
    [selectedRange, onRangeChange]
  );

  const handleDayClick = useCallback(
    (date: Date) => {
      if (enableRange) {
        handleRangeSelection(date);
      } else {
        setSelectedDate(date);
        onDateChange?.(date);
      }
    },
    [enableRange, handleRangeSelection, onDateChange]
  );

  const handlePrevMonth = useCallback(() => {
    setSlideDirection("right");
    setCurrentMonth(prev => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setSlideDirection("left");
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  return (
    <div className="calendar">
      <Header
        selectedDate={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        disabledPrevMonth={isDisabledPrevMonth}
        disabledNextMonth={isDisabledNextMonth}
        weekNumbersCountry={weekNumbersCountry}
      />

      {showWeekNumbers && <WeakNumbers weekNumbersCountry={weekNumbersCountry} />}

      <CalendarSlideTransition
        transitionKey={transitionKey}
        slideDirection={slideDirection}
        activeTransition={activeTransition}
      >
        <Days days={daysState} onDayClick={handleDayClick} />
      </CalendarSlideTransition>
    </div>
  );
};
