import { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "v2/Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "select",
      options: [
        [
          { label: "프로젝트1", value: "프로젝트1" },
          { label: "프로젝트2", value: "프로젝트2" },
          { label: "프로젝트3", value: "프로젝트3" }
        ]
      ],
      description: "radio의 옵션을 지정"
    },
    disabled: {
      control: "boolean",
      description: "radio의 비활성화 상태를 지정"
    },
    defaultValue: {
      control: "select",
      options: ["프로젝트1", "프로젝트2", "프로젝트3"],
      description: "radio의 기본 값을 지정"
    }
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    defaultValue: "프로젝트1",
    options: [
      { label: "프로젝트1", value: "프로젝트1" },
      { label: "프로젝트2", value: "프로젝트2" },
      { label: "프로젝트3", value: "프로젝트3" }
    ]
  },
  render: args => <Radio {...args} />
};

export const Disabled: Story = {
  args: {
    options: [
      { label: "프로젝트1", value: "프로젝트1" },
      { label: "프로젝트2", value: "프로젝트2" },
      { label: "프로젝트3", value: "프로젝트3" }
    ],
    disabled: true
  },
  render: args => <Radio {...args} />
};
