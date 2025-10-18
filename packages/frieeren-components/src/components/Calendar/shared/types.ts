/**
 * 캘린더 언어 설정 타입
 * @description 한국어(kr) 또는 영어(en) 지원
 */
export type WeekNumbersCountry = "kr" | "en";

/**
 * 요일 표시 텍스트 매핑 타입
 * @description 언어별 요일 배열 (일~토 또는 S~S)
 */
export type WeekNumbers = Record<WeekNumbersCountry, string[]>;

/**
 * 헤더 제목 포맷 매핑 타입
 * @description 언어별 날짜 포맷 문자열 (예: "yyyy. MM")
 */
export type HeaderTitle = Record<WeekNumbersCountry, string>;

/**
 * 슬라이드 전환 방향 타입
 * @description 캘린더 월/주 전환 시 애니메이션 방향
 */
export type SlideDirection = "left" | "right";

/**
 * 날짜 범위 선택 타입
 * @description 시작일과 종료일을 포함하는 범위 (Month Calendar 전용)
 */
export type DateRange = {
  /** 범위 시작 날짜 */
  start: Date | null;
  /** 범위 종료 날짜 */
  end: Date | null;
};

/**
 * 기본 날짜 조건 타입
 * @description 모든 캘린더에서 공통으로 사용하는 날짜 상태 조건들
 */
export type BaseDateConditions = {
  /** 오늘 날짜 여부 */
  isToday: boolean;
  /** 주말 여부 (토, 일) */
  isWeekend: boolean;
  /** 비활성화 여부 (minDate/maxDate 범위 외) */
  isDisabled: boolean;
  /** 선택된 날짜 여부 */
  isSelected: boolean;
  /** 다른 월의 날짜 여부 (Month Calendar에서 사용) */
  isOtherMonth: boolean;
};

/**
 * 기본 날짜 상태 타입
 * @description 날짜와 해당 날짜의 조건들을 포함하는 기본 구조
 */
export type BaseDayState = {
  /** 날짜 객체 */
  date: Date;
  /** 해당 날짜의 상태 조건들 */
  conditions: BaseDateConditions;
};

/**
 * 기본 캘린더 Props 타입
 * @description 모든 캘린더 컴포넌트에서 공통으로 사용하는 기본 속성들
 */
export type BaseCalendarProps = {
  /** 선택 가능한 최소 날짜 */
  minDate?: Date;
  /** 선택 가능한 최대 날짜 */
  maxDate?: Date;
  /** 탐색 가능한 최소 월 */
  minMonth?: Date;
  /** 탐색 가능한 최대 월 */
  maxMonth?: Date;
  /** 초기 선택/표시 날짜 */
  initDate?: Date;
  /** 슬라이드 전환 애니메이션 활성화 여부 */
  activeTransition?: boolean;
  /** 요일 표시 여부 */
  showWeekNumbers?: boolean;
  /** 언어 설정 */
  weekNumbersCountry?: WeekNumbersCountry;
};

/**
 * 기본 캘린더 헤더 Props 타입
 * @description 캘린더 상단 네비게이션 헤더의 공통 속성들
 */
export type BaseCalendarHeaderProps = {
  /** 현재 표시 중인 날짜 (월/주) */
  selectedDate: Date;
  /** 이전 월/주 이동 핸들러 */
  onPrevMonth: () => void;
  /** 다음 월/주 이동 핸들러 */
  onNextMonth: () => void;
  /** 이전 버튼 비활성화 여부 */
  disabledPrevMonth?: boolean;
  /** 다음 버튼 비활성화 여부 */
  disabledNextMonth?: boolean;
  /** 언어 설정 */
  weekNumbersCountry: WeekNumbersCountry;
};

/**
 * 기본 캘린더 타일 Props 타입
 * @description 개별 날짜 타일 또는 요일 타일의 공통 속성들
 */
export type BaseCalendarTileProps = {
  /** 타일 유형 ("day" | "week-number") */
  type: "day" | "week-number";
  /** 날짜 조건들 (day 타입일 때만 사용) */
  conditions?: BaseDateConditions;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 타일 내용 (날짜 숫자 또는 요일 텍스트) */
  children: React.ReactNode;
};

/**
 * 기본 요일 표시 Props 타입
 * @description 캘린더 상단 요일 표시 영역의 공통 속성들
 */
export type BaseCalendarWeekNumbersProps = {
  /** 언어 설정 */
  weekNumbersCountry: WeekNumbersCountry;
};
