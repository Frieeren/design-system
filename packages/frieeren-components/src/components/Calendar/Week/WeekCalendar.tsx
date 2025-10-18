import cx from "classnames";
import { Fragment, memo } from "react";
import "./WeekCalendar.scss";
import { format } from "date-fns";
import { getDate, getFormattedDate } from "../shared/utils";
import type {
  WeekCalendarProps,
  WeekCalendarTileProps,
  WeekCalendarDaysProps,
  WeekCalendarHeaderProps,
  WeekCalendarWeekNumbersProps
} from "./WeekCalendar.type";
import { CalendarSlideTransition } from "../shared/CalendarSlideTransition";
import Ripple from "../../Ripple/Ripple";
import LeftArrowIcon from "../assets/left-arrow.svg";
import RightArrowIcon from "../assets/right-arrow.svg";
import { HEADER_TITLE, WEEK_WEEK_NUMBERS } from "../shared/constants";
import useWeekCalendar from "./useWeekCalendar";

const Tile = memo(
  ({ type, conditions, onClick, children, date, tileSlot }: WeekCalendarTileProps) => {
    const slotContent = tileSlot?.({
      date,
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

Tile.displayName = "WeekCalendarTile";

const Days = memo(({ days, onDayClick, tileSlot, belowTileSlot }: WeekCalendarDaysProps) => {
  return (
    <div className="week-calendar--days-container">
      {days.map(week => (
        <div className="week-calendar--week-line" key={getFormattedDate(week[0].date)}>
          {week.map(state => {
            const date = state.date;
            const conditions = state.conditions;
            return (
              <div key={getFormattedDate(date)}>
                <Tile
                  type="day"
                  onClick={() => onDayClick(date)}
                  conditions={conditions}
                  date={date}
                  tileSlot={tileSlot}
                >
                  {getDate(date)}
                </Tile>
                <div className="week-calendar--below-tile-slot">{belowTileSlot?.({ date })}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

Days.displayName = "WeekCalendarDays";

const WeekNumbers = memo(({ weekNumbersCountry }: WeekCalendarWeekNumbersProps) => {
  return (
    <div className="week-calendar--week-numbers">
      {WEEK_WEEK_NUMBERS[weekNumbersCountry].map((number, index) => (
        <Tile key={`week-calendar-week-number-${index}`} type="week-number">
          {number}
        </Tile>
      ))}
    </div>
  );
});

WeekNumbers.displayName = "WeekCalendarWeekNumbers";

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

Header.displayName = "WeekCalendarHeader";

const WeekCalendar = ({
  minDate,
  maxDate,
  minMonth,
  maxMonth,
  initDate,
  tileSlot,
  belowTileSlot,
  onDateChange,
  activeTransition = true,
  showWeekNumbers = true,
  weekNumbersCountry = "kr"
}: WeekCalendarProps) => {
  const {
    currentWeek,
    slideDirection,
    daysState,
    transitionKey,
    isDisabledPrevMonth,
    isDisabledNextMonth,
    handleDayClick,
    handlePrevMonth,
    handleNextMonth
  } = useWeekCalendar({
    initDate,
    onDateChange,
    minDate,
    maxDate,
    minMonth,
    maxMonth
  });

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

      {showWeekNumbers && <WeekNumbers weekNumbersCountry={weekNumbersCountry} />}

      <CalendarSlideTransition
        calendarVariant="week"
        transitionKey={transitionKey}
        slideDirection={slideDirection}
        activeTransition={activeTransition}
      >
        <Days
          days={daysState}
          onDayClick={handleDayClick}
          tileSlot={tileSlot}
          belowTileSlot={belowTileSlot}
        />
      </CalendarSlideTransition>
    </div>
  );
};

WeekCalendar.displayName = "WeekCalendar";

export { WeekCalendar };
