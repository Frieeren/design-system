import type { Meta, StoryObj } from "@storybook/react";
import { WeekCalendar } from "./WeekCalendar";

const meta = {
  title: "Components/WeekCalendar",
  component: WeekCalendar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
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
    }
  }
} satisfies Meta<typeof WeekCalendar>;

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

export const WithCustomTile: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
    onDateChange: date => {
      console.log("Date changed:", date);
    },
    tileSlot: ({ date, type, conditions, defaultContent }) => {
      if (type === "day" && conditions?.isToday) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px"
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#ff6b6b",
                fontWeight: "bold"
              }}
            >
              오늘
            </span>
            {defaultContent}
          </div>
        );
      }

      if (type === "day" && conditions?.isWeekend) {
        return (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {defaultContent}
            <span
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                width: "6px",
                height: "6px",
                backgroundColor: "#ffd93d",
                borderRadius: "50%"
              }}
            />
          </div>
        );
      }

      return defaultContent;
    }
  }
};

export const WithEvents: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
    onDateChange: date => {
      console.log("Date changed:", date);
    },
    tileSlot: ({ date, type, conditions, defaultContent }) => {
      if (type !== "day") return defaultContent;

      // 예시 이벤트 데이터
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
