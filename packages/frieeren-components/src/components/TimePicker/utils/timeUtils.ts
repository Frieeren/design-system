import { TimeValue, AmPm } from "../TimePicker.type";

/**
 * 24시간 형식을 12시간 형식으로 변환
 */
export const convertTo12Hour = (hour24: number): { hour12: number; ampm: AmPm } => {
  if (hour24 === 0) {
    return { hour12: 12, ampm: "AM" };
  } else if (hour24 < 12) {
    return { hour12: hour24, ampm: "AM" };
  } else if (hour24 === 12) {
    return { hour12: 12, ampm: "PM" };
  } else {
    return { hour12: hour24 - 12, ampm: "PM" };
  }
};

/**
 * 12시간 형식을 24시간 형식으로 변환
 */
export const convertTo24Hour = (hour12: number, ampm: AmPm): number => {
  if (hour12 === 12) {
    return ampm === "AM" ? 0 : 12;
  } else {
    return ampm === "AM" ? hour12 : hour12 + 12;
  }
};

/**
 * 시간이 지정된 범위 내에 있는지 검증
 */
export const isTimeInRange = (
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean => {
  if (minTime) {
    if (time.hour < minTime.hour || (time.hour === minTime.hour && time.minute < minTime.minute)) {
      return false;
    }
  }

  if (maxTime) {
    if (time.hour > maxTime.hour || (time.hour === maxTime.hour && time.minute > maxTime.minute)) {
      return false;
    }
  }

  return true;
};

/**
 * 시간 값을 포맷팅된 문자열로 변환
 */
export const formatTimeValue = (time: TimeValue, use24Hour: boolean = true): string => {
  if (use24Hour) {
    return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
  } else {
    const { hour12, ampm } = convertTo12Hour(time.hour);
    return `${hour12}:${time.minute.toString().padStart(2, "0")} ${ampm}`;
  }
};

/**
 * 문자열을 TimeValue로 파싱
 */
export const parseTimeString = (timeString: string): TimeValue | null => {
  const timeRegex = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i;
  const match = timeString.match(timeRegex);

  if (!match) return null;

  let hour = parseInt(match[1]);
  const minute = parseInt(match[2]);
  const ampm = match[3]?.toUpperCase() as AmPm | undefined;

  // 12시간 형식인 경우 24시간으로 변환
  if (ampm) {
    hour = convertTo24Hour(hour, ampm);
  }

  // 유효성 검사
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  return { hour, minute };
};
