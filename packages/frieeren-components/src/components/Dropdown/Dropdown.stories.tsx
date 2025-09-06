import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

/**
 * **radix docs**
 * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 */
const meta = {
  title: "v2/Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "dropdown의 라벨을 지정"
    },
    items: {
      control: "select",
      options: [
        [
          {
            value: "프로젝트1",
            label: "프로젝트1"
          },
          {
            value: "프로젝트2",
            label: "프로젝트2"
          },
          {
            value: "프로젝트3",
            label: "프로젝트3"
          },
          {
            value: "프로젝트4",
            label: "프로젝트4"
          },
          {
            value: "프로젝트5",
            label: "프로젝트5"
          }
        ]
      ],
      description: "dropdown의 아이템을 지정"
    }
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "프로젝트 선택",
    items: [
      {
        value: "프로젝트1",
        label: "프로젝트1"
      },
      {
        value: "프로젝트2",
        label: "프로젝트2"
      },
      {
        value: "프로젝트3",
        label: "프로젝트3"
      },
      {
        value: "프로젝트4",
        label: "프로젝트4"
      },
      {
        value: "프로젝트5",
        label: "프로젝트5"
      }
    ]
  },
  render: args => <Dropdown {...args} />
};
