import type { Meta, StoryObj } from "@storybook/react";
import { WeekCalendar } from "./WeekCalendar";
import EmptyIcon from "../assets/empty.svg";
import HalfFilledIcon from "../assets/half-filled.svg";
import FullFilledIcon from "../assets/full-filled.svg";

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

export const WithEvents: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
    onDateChange: date => {
      console.log("Date changed:", date);
    },
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

export const WithBelowTileSlot: Story = {
  args: {
    weekNumbersCountry: "kr",
    activeTransition: true,
    showWeekNumbers: true,
    belowTileSlot: ({ date }) => {
      // 조건 : 일,월,화,수 이면 FullFilledIcon 렌더링
      // 조건 : 목,금 이면 HalfFilledIcon 렌더링
      // 조건 : 토 이면 EmptyIcon 렌더링
      if (date && [1, 2, 3, 4].includes(date.getDay())) {
        return <FullFilledIcon />;
      } else if (date && [5, 6].includes(date.getDay())) {
        return <HalfFilledIcon />;
      } else {
        return <EmptyIcon />;
      }
    }
  }
};
