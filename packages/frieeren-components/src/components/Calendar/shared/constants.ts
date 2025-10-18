import type { WeekNumbers, HeaderTitle } from "./types";

const MONTH_WEEK_NUMBERS: WeekNumbers = {
  kr: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["S", "M", "T", "W", "T", "F", "S"]
};

const WEEK_WEEK_NUMBERS: WeekNumbers = {
  kr: ["월", "화", "수", "목", "금", "토", "일"],
  en: ["M", "T", "W", "T", "F", "S", "S"]
};

const HEADER_TITLE: HeaderTitle = {
  kr: "yyyy. MM",
  en: "yyyy. MM"
};

export { MONTH_WEEK_NUMBERS, WEEK_WEEK_NUMBERS, HEADER_TITLE };
