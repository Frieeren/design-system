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

export const WithEvents: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: true,
    weekNumbersCountry: "kr",
    tileSlot: ({ date, defaultContent }) => {
      const hasEvent = date && [15, 20, 25].includes(date.getDate());
      const hasMultipleEvents = date && date.getDate() === 20;

      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {defaultContent}
          {hasEvent && (
            <div
              style={{
                position: "absolute",
                bottom: "4px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "2px"
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#4dabf7",
                  borderRadius: "50%"
                }}
              />
              {hasMultipleEvents && (
                <>
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "#51cf66",
                      borderRadius: "50%"
                    }}
                  />
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "#ff8787",
                      borderRadius: "50%"
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      );
    }
  }
};
