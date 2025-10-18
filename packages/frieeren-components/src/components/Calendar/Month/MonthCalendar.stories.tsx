import type { Meta, StoryObj } from "@storybook/react";
import { MonthCalendar } from "./MonthCalendar";

const meta = {
  title: "Components/MonthCalendar",
  component: MonthCalendar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    enableRange: {
      control: "boolean",
      description: "범위 선택 모드 활성화"
    },
    activeTransition: {
      control: "boolean",
      description: "슬라이드 전환 애니메이션 활성화"
    },
    showWeekNumbers: {
      control: "boolean",
      description: "요일 표시"
    },
    weekNumbersCountry: {
      control: "select",
      options: ["kr", "en"],
      description: "언어 설정"
    },
    onlyViewMonthDays: {
      control: "boolean",
      description: "현재 월의 날짜만 표시"
    }
  }
} satisfies Meta<typeof MonthCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const WithRange: Story = {
  args: {
    enableRange: true,
    activeTransition: true,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    onRangeChange: range => {
      console.log("Range changed:", range);
    }
  }
};

export const EnglishVersion: Story = {
  args: {
    weekNumbersCountry: "en",
    activeTransition: true,
    showWeekNumbers: true,
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const OnlyCurrentMonth: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    onlyViewMonthDays: true,
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const WithoutWeekNumbers: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: false,
    weekNumbersCountry: "kr",
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const WithoutTransition: Story = {
  args: {
    activeTransition: false,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const WithDateLimits: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    minDate: new Date(2024, 0, 15), // 2024년 1월 15일
    maxDate: new Date(2024, 11, 15), // 2024년 12월 15일
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};
