import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

/**
 * **radix docs**
 * https://www.radix-ui.com/primitives/docs/components/tabs
 */
const meta = {
  title: "v2/Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "select",
      options: ["Check list", "Meeting"],
      description: "활성화 할 value"
    },
    tabItems: {
      control: "select",
      options: [
        [{ value: "Check list", label: "Check list" }],
        [{ value: "Meeting", label: "Meeting" }]
      ],
      description: "tab의 아이템 리스트"
    },
    defaultValue: {
      control: "select",
      options: ["Check list", "Meeting"],
      description: "초기 활성 tab 값을 설정"
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    width: "360px",
    tabItems: [
      { value: "Check list", label: "Check list" },
      { value: "Meeting", label: "Meeting" }
    ],
    defaultValue: "Check list"
  },
  render: args => <Tabs {...args} key={`tabs_${args.defaultValue}`} />
};
