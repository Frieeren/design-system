import cx from "classnames";
import { memo } from "react";
import "./MonthCalendar.scss";
import { format } from "date-fns";
import { getDate, getFormattedDate } from "../shared/utils";
import type {
  MonthCalendarProps,
  MonthCalendarTileProps,
  MonthCalendarDaysProps,
  MonthCalendarHeaderProps,
  MonthCalendarWeekNumbersProps
} from "./MonthCalendar.type";
import { CalendarSlideTransition } from "../shared/CalendarSlideTransition";
import Ripple from "../../Ripple/Ripple";
import LeftArrowIcon from "../assets/left-arrow.svg";
import RightArrowIcon from "../assets/right-arrow.svg";
import { WEEK_NUMBERS, HEADER_TITLE } from "../shared/constants";
import useMonthCalendar from "./useMonthCalendar";

const Tile = memo(
  ({ type, conditions, onClick, children, date, tileSlot }: MonthCalendarTileProps) => {
    const slotContent = tileSlot?.({
      date,
      conditions,
      defaultContent: children
    });

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
        {slotContent || children}
        <span className="month-calendar--tile-day-background" />
        <Ripple center />
      </button>
    );
  }
);

Tile.displayName = "MonthCalendarTile";

const Days = memo(({ days, onDayClick, tileSlot }: MonthCalendarDaysProps) => {
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

Days.displayName = "MonthCalendarDays";

const WeekNumbers = memo(({ weekNumbersCountry }: MonthCalendarWeekNumbersProps) => {
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

WeekNumbers.displayName = "MonthCalendarWeekNumbers";

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

Header.displayName = "MonthCalendarHeader";

const MonthCalendar = ({
  minDate,
  maxDate,
  minMonth,
  maxMonth,
  initDate,
  tileSlot,
  onDateChange,
  onRangeChange,
  enableRange = false,
  showWeekNumbers = true,
  activeTransition = true,
  onlyViewMonthDays = false,
  weekNumbersCountry = "kr"
}: MonthCalendarProps) => {
  const {
    currentMonth,
    slideDirection,
    daysState,
    transitionKey,
    isDisabledPrevMonth,
    isDisabledNextMonth,
    handleDayClick,
    handlePrevMonth,
    handleNextMonth
  } = useMonthCalendar({
    minDate,
    maxDate,
    minMonth,
    maxMonth,
    initDate,
    enableRange,
    onDateChange,
    onRangeChange,
    onlyViewMonthDays
  });

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

      {showWeekNumbers && <WeekNumbers weekNumbersCountry={weekNumbersCountry} />}

      <CalendarSlideTransition
        calendarVariant="month"
        transitionKey={transitionKey}
        slideDirection={slideDirection}
        activeTransition={activeTransition}
      >
        <Days days={daysState} onDayClick={handleDayClick} tileSlot={tileSlot} />
      </CalendarSlideTransition>
    </div>
  );
};

MonthCalendar.displayName = "MonthCalendar";

export { MonthCalendar };
