import cx from "classnames";
import { memo, useState, useMemo, useCallback } from "react";
import "./MonthCalendar.scss";
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
} from "../utils";
import type {
  WeekNumbers,
  HeaderTitle,
  MonthCalendarProps,
  SlideDirection,
  MonthCalendarTileProps,
  MonthCalendarDaysProps,
  MonthCalendarHeaderProps,
  MonthCalendarWeekNumbersProps,
  MonthCalendarSlideTransitionProps,
  DateRange
} from "./MonthCalendar.type";
import Ripple from "../../Ripple/Ripple";
import LeftArrowIcon from "../assets/left-arrow.svg";
import RightArrowIcon from "../assets/right-arrow.svg";

const WEEK_NUMBERS: WeekNumbers = {
  kr: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["S", "M", "T", "W", "T", "F", "S"]
};

const HEADER_TITLE: HeaderTitle = {
  kr: "yyyy. MM",
  en: "yyyy. MM"
};

const CalendarSlideTransition = ({
  children,
  transitionKey,
  slideDirection,
  activeTransition
}: MonthCalendarSlideTransitionProps) => {
  if (!activeTransition) {
    return <div className="month-calendar--transition-container">{children}</div>;
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
    <div className="month-calendar--transition-container">
      <AnimatePresence custom={slideDirection}>
        <motion.div
          key={transitionKey}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.25,
            ease: [0.35, 0.8, 0.4, 1]
          }}
          className="month-calendar--slide-content"
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

const Tile = memo(({ type, conditions, onClick, children }: MonthCalendarTileProps) => {
  return (
    <button
      className={cx("month-calendar--tile", {
        "month-calendar--tile--day": type === "day",
        "month-calendar--tile--weekend": conditions?.isWeekend,
        "month-calendar--tile--week-number": type === "week-number",
        "month-calendar--tile--disabled": conditions?.isDisabled,
        "month-calendar--tile--today": conditions?.isToday,
        "month-calendar--tile--selected": conditions?.isSelected,
        "month-calendar--tile--other-month": conditions?.isOtherMonth,
        "month-calendar--tile--only-view-month-days": conditions?.isOnlyViewMonthDays,
        "month-calendar--tile--range-start": conditions?.isRangeStart,
        "month-calendar--tile--range-end": conditions?.isRangeEnd,
        "month-calendar--tile--in-range": conditions?.isInRange
      })}
      onClick={onClick}
    >
      {children}
      <span className="month-calendar--tile-day-background" />
      <Ripple center />
    </button>
  );
});

Tile.displayName = "Tile";

const Days = memo(({ days, onDayClick }: MonthCalendarDaysProps) => {
  return (
    <div className="month-calendar--days-container">
      {days.map(week => (
        <div className="month-calendar--week-line" key={getFormattedDate(week[0].date)}>
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

const WeakNumbers = memo(({ weekNumbersCountry }: MonthCalendarWeekNumbersProps) => {
  return (
    <div className="month-calendar--week-numbers">
      {WEEK_NUMBERS[weekNumbersCountry].map((number, index) => (
        <Tile key={`month-calendar-week-number-${index}`} type="week-number">
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
  }: MonthCalendarHeaderProps) => {
    return (
      <div className="month-calendar--header">
        <button
          className="month-calendar--header-button"
          onClick={onPrevMonth}
          disabled={disabledPrevMonth}
        >
          <LeftArrowIcon />
        </button>
        <div className="month-calendar--header-title">
          {format(selectedDate, HEADER_TITLE[weekNumbersCountry])}
        </div>
        <button
          className="month-calendar--header-button"
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

const createDateState = ({
  date,
  currentMonth,
  selectedDate,
  selectedRange,
  enableRange,
  minDate,
  maxDate,
  onlyViewMonthDays
}: {
  date: Date;
  currentMonth: Date;
  selectedDate: Date;
  selectedRange: DateRange;
  enableRange: boolean;
  minDate?: Date;
  maxDate?: Date;
  onlyViewMonthDays: boolean;
}) => {
  const baseConditions = {
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isDisabled: isDisabledDay(date, minDate, maxDate),
    isOtherMonth: !isCurrentMonth(date, currentMonth),
    isOnlyViewMonthDays: onlyViewMonthDays
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

export const MonthCalendar = ({
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
  onlyViewMonthDays = false
}: MonthCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentMonthDays(currentMonth), [currentMonth]);

  const daysState = useMemo(() => {
    const state = days.map(day =>
      createDateState({
        date: day,
        currentMonth,
        selectedDate,
        selectedRange,
        enableRange,
        minDate,
        maxDate,
        onlyViewMonthDays
      })
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
    <div className="month-calendar">
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
