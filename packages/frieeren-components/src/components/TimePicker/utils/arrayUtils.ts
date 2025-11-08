/**
 * 시간 배열 생성 (24시간 또는 12시간 형식)
 */
export const generateHourValues = (use24Hour: boolean): string[] => {
  if (use24Hour) {
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  } else {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  }
};

/**
 * 분 배열 생성 (지정된 간격으로)
 */
export const generateMinuteValues = (minuteStep: number = 1): string[] => {
  const minutes: string[] = [];
  for (let i = 0; i < 60; i += minuteStep) {
    minutes.push(i.toString().padStart(2, "0"));
  }
  return minutes;
};

/**
 * AM/PM 배열 생성
 */
export const generateAmPmValues = (): string[] => {
  return ["AM", "PM"];
};

/**
 * 현재 시간에서 선택된 시간 인덱스 계산
 */
export const getSelectedHourIndex = (hour: number, use24Hour: boolean): number => {
  if (use24Hour) {
    return hour;
  } else {
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return hour12 - 1;
  }
};

/**
 * 현재 분에서 선택된 분 인덱스 계산
 */
export const getSelectedMinuteIndex = (minute: number, minuteStep: number): number => {
  return Math.floor(minute / minuteStep);
};

/**
 * 현재 시간에서 AM/PM 인덱스 계산
 */
export const getSelectedAmPmIndex = (hour: number): number => {
  return hour < 12 ? 0 : 1;
};
