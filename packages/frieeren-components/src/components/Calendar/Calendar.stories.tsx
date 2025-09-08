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