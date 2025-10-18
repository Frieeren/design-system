import cx from "classnames";
import { memo, useState, useMemo, useCallback } from "react";
import "./WeekCalendar.scss";
import { motion, AnimatePresence } from "motion/react";
import { format, isToday, isSameDay, isWeekend, isAfter, subWeeks, addWeeks } from "date-fns";
import {
  chunk,
  getDate,
  getFormattedDate,
  isDisabledDay,
  currentWeekDays,
  isAfterWeek,
  isBeforeWeek
} from "../utils";
import type {
  WeekNumbers,
  HeaderTitle,
  WeekCalendarProps,
  SlideDirection,
  WeekCalendarTileProps,
  WeekCalendarDaysProps,
  WeekCalendarHeaderProps,
  WeekCalendarWeekNumbersProps,
  WeekCalendarSlideTransitionProps,
  TileSlotProps
} from "./WeekCalendar.type";
import Ripple from "../../Ripple/Ripple";
import LeftArrowIcon from "../assets/left-arrow.svg";
import RightArrowIcon from "../assets/right-arrow.svg";

const WEEK_NUMBERS: WeekNumbers = {
  kr: ["월", "화", "수", "목", "금", "토", "일"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
}: WeekCalendarSlideTransitionProps) => {
  if (!activeTransition) {
    return <div className="week-calendar--transition-container">{children}</div>;
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
    <div className="week-calendar--transition-container">
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
          className="week-calendar--slide-content"
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

const Tile = memo(
  ({ type, conditions, onClick, children, date, tileSlot }: WeekCalendarTileProps) => {
    const slotContent = tileSlot?.({
      date,
      type,
      conditions,
      defaultContent: children
    });

    return (
      <button
        className={cx("week-calendar--tile", {
          "week-calendar--tile--day": type === "day",
          "week-calendar--tile--weekend": conditions?.isWeekend,
          "week-calendar--tile--week-number": type === "week-number",
          "week-calendar--tile--disabled": conditions?.isDisabled,
          "week-calendar--tile--today": conditions?.isToday,
          "week-calendar--tile--selected": conditions?.isSelected,
          "week-calendar--tile--other-month": conditions?.isOtherMonth
        })}
        onClick={onClick}
      >
        {slotContent || children}
        <span className="week-calendar--tile-day-background" />
        <Ripple center />
      </button>
    );
  }
);

Tile.displayName = "Tile";

const Days = memo(({ days, onDayClick, tileSlot }: WeekCalendarDaysProps) => {
  return (
    <div className="week-calendar--days-container">
      {days.map(week => (
        <div className="week-calendar--week-line" key={getFormattedDate(week[0].date)}>
          {week.map(state => {
            const date = state.date;
            const conditions = state.conditions;
            return (
              <Tile
                key={getFormattedDate(date)}
                type="day"
                onClick={() => onDayClick(date)}
                conditions={conditions}
                date={date}
                tileSlot={tileSlot}
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

const WeakNumbers = memo(({ weekNumbersCountry }: WeekCalendarWeekNumbersProps) => {
  return (
    <div className="week-calendar--week-numbers">
      {WEEK_NUMBERS[weekNumbersCountry].map((number, index) => (
        <Tile key={`week-calendar-week-number-${index}`} type="week-number">
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
  }: WeekCalendarHeaderProps) => {
    return (
      <div className="week-calendar--header">
        <button
          className="week-calendar--header-button"
          onClick={onPrevMonth}
          disabled={disabledPrevMonth}
        >
          <LeftArrowIcon />
        </button>
        <div className="week-calendar--header-title">
          {format(selectedDate, HEADER_TITLE[weekNumbersCountry])}
        </div>
        <button
          className="week-calendar--header-button"
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
  selectedDate,
  minDate,
  maxDate
}: {
  date: Date;
  selectedDate: Date;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const baseConditions = {
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isDisabled: isDisabledDay(date, minDate, maxDate),
    isOtherMonth: false
  };

  return {
    date,
    conditions: {
      ...baseConditions,
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false
    }
  };
};

export const WeekCalendar = ({
  minDate,
  maxDate,
  minMonth,
  maxMonth,
  initDate,
  onDateChange,
  activeTransition = true,
  showWeekNumbers = true,
  weekNumbersCountry = "kr",
  tileSlot
}: WeekCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentWeekDays(currentWeek), [currentWeek]);

  const daysState = useMemo(() => {
    const state = days.map(day =>
      createDateState({
        date: day,
        selectedDate,
        minDate,
        maxDate
      })
    );
    return chunk(state, 7);
  }, [days, minDate, maxDate, selectedDate]);

  const transitionKey = useMemo(() => format(currentWeek, "yyyy-MM-dd"), [currentWeek]);
  const isDisabledPrevMonth = useMemo(
    () => minMonth && isBeforeWeek(currentWeek, minMonth),
    [minMonth, currentWeek]
  );
  const isDisabledNextMonth = useMemo(
    () => maxMonth && isAfterWeek(currentWeek, maxMonth),
    [maxMonth, currentWeek]
  );

  const handleDayClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateChange?.(date);
    },
    [setSelectedDate, onDateChange]
  );

  const handlePrevMonth = useCallback(() => {
    setSlideDirection("right");
    setCurrentWeek(prev => subWeeks(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setSlideDirection("left");
    setCurrentWeek(prev => addWeeks(prev, 1));
  }, []);

  return (
    <div className="week-calendar">
      <Header
        selectedDate={currentWeek}
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
        <Days days={daysState} onDayClick={handleDayClick} tileSlot={tileSlot} />
      </CalendarSlideTransition>
    </div>
  );
};
