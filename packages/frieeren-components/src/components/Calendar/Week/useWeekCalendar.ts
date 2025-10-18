import { format, isToday, isSameDay, isWeekend, subWeeks, addWeeks } from "date-fns";
import { useState, useMemo, useCallback } from "react";
import { currentWeekDays, chunk, isBeforeWeek, isAfterWeek, isDisabledDay } from "../shared/utils";
import { SlideDirection } from "../shared/types";
import { CreateWeekDateStateProps, UseWeekCalendarProps, WeekDayState } from "./WeekCalendar.type";

/**
 * 주 캘린더 날짜 상태 생성
 * @description 주 캘린더 날짜 상태 생성
 * @param {CreateWeekDateStateProps} props
 * @returns {WeekDayState}
 */
const createWeekDateState = ({
  date,
  selectedDate,
  minDate,
  maxDate
}: CreateWeekDateStateProps): WeekDayState => {
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

/**
 * 주 캘린더 훅
 * @description 주 캘린더 훅
 * @param {UseWeekCalendarProps} props
 */
const useWeekCalendar = (props: UseWeekCalendarProps) => {
  const { initDate, onDateChange, minDate, maxDate, minMonth, maxMonth } = props;

  const [currentWeek, setCurrentWeek] = useState<Date>(initDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(initDate || new Date());
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");

  const days = useMemo(() => currentWeekDays(currentWeek), [currentWeek]);

  const daysState = useMemo(() => {
    const state = days.map(day =>
      createWeekDateState({
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
    [onDateChange]
  );

  const handlePrevMonth = useCallback(() => {
    setSlideDirection("right");
    setCurrentWeek(prev => subWeeks(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setSlideDirection("left");
    setCurrentWeek(prev => addWeeks(prev, 1));
  }, []);

  return {
    currentWeek,
    selectedDate,
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

export default useWeekCalendar;
