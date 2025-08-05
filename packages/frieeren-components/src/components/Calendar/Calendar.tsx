import { format, isToday, isSameDay, addMonths, subMonths } from "date-fns";

import "./Calendar.scss";
import { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

import cx from "classnames";
import { chunk, getDate, isCurrentMonth, getFormattedDate, currentMonthDays } from "./utils";
import Ripple from "../Ripple/Ripple";

type WeekNumbersCountry = "kr" | "en";
type WeekNumbers = Record<WeekNumbersCountry, string[]>;
type SlideDirection = "left" | "right";

const WEEK_NUMBERS: WeekNumbers = {
  kr: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["S", "M", "T", "W", "T", "F", "S"]
};

const CalendarSlideTransition = ({
  children,
  transitionKey,
  slideDirection,
  activeTransition,
  onTransitionEnd
}: {
  children: React.ReactElement;
  transitionKey: string;
  slideDirection: SlideDirection;
  activeTransition: boolean;
  onTransitionEnd?: () => void;
}) => {
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
      <AnimatePresence onExitComplete={onTransitionEnd} custom={slideDirection}>
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

const Tile = ({
  type,
  conditions,
  onClick,
  children
}: {
  type: "day" | "week-number";
  conditions?: {
    isToday: boolean;
    isDisabled: boolean;
    isSelected: boolean;
    isOtherMonth: boolean;
  };
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={cx("calendar--tile", {
        "calendar--tile--day": type === "day",
        "calendar--tile--week-number": type === "week-number",
        "calendar--tile--disabled": conditions?.isDisabled,
        "calendar--tile--today": conditions?.isToday,
        "calendar--tile--selected": conditions?.isSelected,
        "calendar--tile--other-month": conditions?.isOtherMonth
      })}
      onClick={onClick}
    >
      {children}
      <Ripple center />
    </button>
  );
};

const Days = ({ days, onDayClick }: { days: DayState[][]; onDayClick: (date: Date) => void }) => {
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
};

const WeakNumbers = memo(({ weekNumbersCountry }: { weekNumbersCountry: WeekNumbersCountry }) => {
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

const Header = ({
  selectedDate,
  onPrevMonth,
  onNextMonth
}: {
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) => {
  return (
    <div className="calendar--header">
      <div className="calendar--header-title">{format(selectedDate, "MMMM yyyy")}</div>
      <div className="calendar--header-buttons">
        <button onClick={onPrevMonth}>{"<"}</button>
        <button onClick={onNextMonth}>{">"}</button>
      </div>
    </div>
  );
};

type DayState = {
  date: Date;
  conditions: {
    isToday: boolean;
    isDisabled: boolean;
    isSelected: boolean;
    isOtherMonth: boolean;
  };
};

export const Calendar = ({
  minDate,
  maxDate,
  initDate,
  activeTransition = true,
  weekNumbersCountry = "en",
  onlyViewMonthDays = true
}: {
  minDate?: Date;
  maxDate?: Date;
  initDate?: Date;
  activeTransition?: boolean;
  onlyViewMonthDays?: boolean;
  weekNumbersCountry?: WeekNumbersCountry;
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentMonthDays(currentMonth), [currentMonth]);
  const transitionKey = useMemo(() => format(currentMonth, "yyyy-MM"), [currentMonth]);
  const daysState = useMemo(() => {
    const state = days.map(day => ({
      date: day,
      conditions: {
        isToday: isToday(day),
        isDisabled: false,
        isOtherMonth: onlyViewMonthDays ? !isCurrentMonth(day, currentMonth) : false,
        isSelected: selectedDate ? isSameDay(day, selectedDate) : false
      }
    }));

    return chunk(state, 7);
  }, [
    days,
    currentMonth,
    selectedDate,
    onlyViewMonthDays
  ]);

  const handleDayClick = (date: Date) => {
      setSelectedDate(date);
  };

  const handlePrevMonth = () => {
      setSlideDirection("right");
      setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
      setSlideDirection("left");
      setCurrentMonth(prev => addMonths(prev, 1));
  };

  return (
    <div className="calendar">
      <Header
        selectedDate={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <WeakNumbers weekNumbersCountry={weekNumbersCountry} />

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
