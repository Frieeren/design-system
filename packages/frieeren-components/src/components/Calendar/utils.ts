import {
  endOfMonth,
  format,
  subDays,
  isSameMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  addDays,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfWeek
} from "date-fns";
import type { DateRange } from "./Calendar.type";

const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

const getDate = (date: Date) => {
  return date.getDate();
};

const isCurrentMonth = (date: Date, selectedDate: Date) => {
  return isSameMonth(date, selectedDate);
};

const getFormattedDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

const currentWeekDays = (date: Date): Date[] => {
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
};

const currentMonthDays = (date: Date): Date[] => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfWeek = getDay(startDate);

  const days: Date[] = [];

  // prev month remain days
  const prevRemainCnt = firstDayOfWeek;
  const prevMonthRemainDays = Array.from({ length: prevRemainCnt }, (_, i) =>
    subDays(startDate, prevRemainCnt - i)
  );

  // current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => addDays(startDate, i));

  // next month remain days
  const totalDaysInCalendar = prevRemainCnt + daysInMonth;
  const weeksInMonth = Math.ceil(totalDaysInCalendar / 7);
  const totalCells = weeksInMonth * 7;
  const nextRemainCnt = totalCells - prevRemainCnt - daysInMonth;
  const nextMonthRemainDays = Array.from({ length: nextRemainCnt }, (_, i) =>
    addDays(endDate, i + 1)
  );

  days.push(...prevMonthRemainDays, ...currentMonthDays, ...nextMonthRemainDays);

  return days;
};

const isDisabledDay = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate && maxDate) return isBefore(date, minDate) || isAfter(date, maxDate);
  if (minDate) return isBefore(date, minDate);
  if (maxDate) return isAfter(date, maxDate);

  return false;
};

const isBeforeWeek = (date: Date, minDate: Date) => {
  const minWeek = startOfWeek(minDate, { weekStartsOn: 1 });
  const currentWeek = startOfWeek(date, { weekStartsOn: 1 });

  return isBefore(currentWeek, minWeek);
};

const isAfterWeek = (date: Date, maxDate: Date) => {
  const currentWeek = startOfWeek(date, { weekStartsOn: 1 });
  const maxWeek = startOfWeek(maxDate, { weekStartsOn: 1 });

  return isAfter(currentWeek, maxWeek);
};

const isBeforeMonth = (date: Date, minDate: Date) => {
  const minMonth = startOfMonth(minDate);
  const currentMonth = startOfMonth(date);

  return isBefore(currentMonth, minMonth);
};

const isAfterMonth = (date: Date, maxDate: Date) => {
  const currentMonth = startOfMonth(date);
  const maxMonth = startOfMonth(maxDate);

  return isAfter(currentMonth, maxMonth);
};

const isRangeStart = (date: Date, range: DateRange) => {
  return range.start ? isSameDay(date, range.start) : false;
};

const isRangeEnd = (date: Date, range: DateRange) => {
  return range.end ? isSameDay(date, range.end) : false;
};

const isInRange = (date: Date, range: DateRange) => {
  if (!range.start || !range.end) return false;

  return isWithinInterval(date, {
    start: range.start,
    end: range.end
  });
};

const isDateInRange = (date: Date, range: DateRange) => {
  if (range.start && !range.end)
    return {
      isSelected: isSameDay(date, range.start),
      isRangeStart: false,
      isRangeEnd: false,
      isInRange: false
    };

  const isStart = isRangeStart(date, range);
  const isEnd = isRangeEnd(date, range);
  const inRange = isInRange(date, range);

  return {
    isSelected: false,
    isRangeStart: isStart,
    isRangeEnd: isEnd,
    isInRange: inRange
  };
};

export {
  chunk,
  getDate,
  isCurrentMonth,
  currentWeekDays,
  getFormattedDate,
  currentMonthDays,
  isDisabledDay,
  isBeforeWeek,
  isAfterWeek,
  isBeforeMonth,
  isAfterMonth,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isDateInRange
};
