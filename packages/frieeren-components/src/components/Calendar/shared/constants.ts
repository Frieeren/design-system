import type { WeekNumbers, HeaderTitle } from "./types";

const WEEK_NUMBERS: WeekNumbers = {
  kr: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["S", "M", "T", "W", "T", "F", "S"]
};

const HEADER_TITLE: HeaderTitle = {
  kr: "yyyy. MM",
  en: "yyyy. MM"
};

export { WEEK_NUMBERS, HEADER_TITLE };
