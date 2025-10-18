import { format, isToday, isSameDay, addMonths, subMonths, isWeekend, isAfter } from "date-fns";
import { useState, useMemo, useCallback } from "react";
import {
  currentMonthDays,
  chunk,
  isBeforeMonth,
  isAfterMonth,
  isDisabledDay,
  isCurrentMonth,
  isDateInRange
} from "../shared/utils";
import { SlideDirection } from "../shared/types";
import {
  CreateMonthDateStateProps,
  DateRange,
  UseMonthCalendarProps,
  MonthDayState
} from "./MonthCalendar.type";

/**
 * 월 캘린더 날짜 상태 생성
 * @description 월 캘린더 날짜 상태 생성
 * @param {CreateMonthDateStateProps} props
 * @returns {MonthDayState}
 */
const createMonthDateState = ({
  date,
  currentMonth,
  selectedDate,
  selectedRange,
  enableRange,
  minDate,
  maxDate,
  onlyViewMonthDays
}: CreateMonthDateStateProps): MonthDayState => {
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

/**
 * 월 캘린더 훅
 * @description 월 캘린더 훅
 * @param {UseMonthCalendarProps} props
 */
const useMonthCalendar = (props: UseMonthCalendarProps) => {
  const {
    initDate,
    enableRange,
    onDateChange,
    onRangeChange,
    minDate,
    maxDate,
    minMonth,
    maxMonth,
    onlyViewMonthDays
  } = props;

  const [currentMonth, setCurrentMonth] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentMonthDays(currentMonth), [currentMonth]);

  const daysState = useMemo(() => {
    const state = days.map(day =>
      createMonthDateState({
        date: day,
        currentMonth,
        selectedDate,
        selectedRange,
        enableRange: enableRange || false,
        minDate,
        maxDate,
        onlyViewMonthDays: onlyViewMonthDays || false
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

  return {
    currentMonth,
    selectedDate,
    selectedRange,
    slideDirection,
    daysState,
    transitionKey,
    isDisabledPrevMonth,
    isDisabledNextMonth,
    handleDayClick,
    handlePrevMonth,
    handleNextMonth
  };
};

export default useMonthCalendar;
