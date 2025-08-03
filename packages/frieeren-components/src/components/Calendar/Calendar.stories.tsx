import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

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
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <Calendar minDate={new Date()} maxDate={new Date()} activeTransition={true} />
      </div>
    );
  }
};
