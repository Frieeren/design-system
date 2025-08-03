import {
  endOfMonth,
  format,
  subDays,
  isSameMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  addDays
} from "date-fns";

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

const currentMonthDays = (date: Date): Date[] => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfWeek = getDay(startDate);

  const days: Date[] = [];

  // 이전 달의 남은 일수
  const prevRemainCnt = firstDayOfWeek;
  const prevMonthRemainDays = Array.from({ length: prevRemainCnt }, (_, i) =>
    subDays(startDate, prevRemainCnt - i)
  );

  // 현재 달의 일수
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => addDays(startDate, i));

  // 실제 해당 월의 주 수 계산
  const totalDaysInCalendar = prevRemainCnt + daysInMonth;
  const weeksInMonth = Math.ceil(totalDaysInCalendar / 7);
  const totalCells = weeksInMonth * 7;

  // 다음 달의 남은 일수 (실제 주 수에 맞춰서)
  const nextRemainCnt = totalCells - prevRemainCnt - daysInMonth;
  const nextMonthRemainDays = Array.from({ length: nextRemainCnt }, (_, i) =>
    addDays(endDate, i + 1)
  );

  days.push(...prevMonthRemainDays, ...currentMonthDays, ...nextMonthRemainDays);

  return days;
};

export { chunk, getDate, isCurrentMonth, getFormattedDate, currentMonthDays };
