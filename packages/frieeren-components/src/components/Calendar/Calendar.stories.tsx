import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";
import { WeekCalendar } from "./WeekCalendar";

const meta = {
  title: "Calendar",
  component: Calendar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTransition: true,
    showWeekNumbers: false,
    onDateChange: date => {
      console.log("Date changed:", date);
    }
  }
};

export const WithRange: Story = {
  args: {
    enableRange: true,
    activeTransition: true,
    showWeekNumbers: false,
    onRangeChange: range => {
      console.log("Range changed:", range);
    }
  }
};

export const EnglishVersion: Story = {
  args: {
    weekNumbersCountry: "en",
    activeTransition: true,
    showWeekNumbers: true
  }
};

export const WeekCalendarStory: Story = {
  args: {
    weekNumbersCountry: "en",
    activeTransition: true,
    showWeekNumbers: true
  },
  render: args => <WeekCalendar {...args} />
};

export const WeekCalendarWithCustomTile: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
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
  },
  render: args => <WeekCalendar {...args} />
};

export const WeekCalendarWithEvents: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
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
  },
  render: args => <WeekCalendar {...args} />
};
