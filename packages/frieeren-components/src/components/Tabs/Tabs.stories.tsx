import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const tabItems = [
  {
    value: "일일 업무",
    label: (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect width="24" height="24" transform="translate(0.5 0.5)" fill="white" />
          <path
            d="M10.4663 15.0813L16.8226 8.725C16.9726 8.575 17.1476 8.5 17.3476 8.5C17.5476 8.5 17.7226 8.575 17.8726 8.725C18.0226 8.875 18.0976 9.05325 18.0976 9.25975C18.0976 9.46625 18.0226 9.64425 17.8726 9.79375L10.9913 16.6938C10.8413 16.8438 10.6663 16.9188 10.4663 16.9188C10.2663 16.9188 10.0913 16.8438 9.94135 16.6938L6.71635 13.4688C6.56635 13.3188 6.49435 13.1408 6.50035 12.9348C6.50635 12.7288 6.5846 12.5505 6.7351 12.4C6.8856 12.2495 7.06385 12.1745 7.26985 12.175C7.47585 12.1755 7.65385 12.2505 7.80385 12.4L10.4663 15.0813Z"
            fill="currentColor"
          />
        </svg>
        <div>일일 업무</div>
      </div>
    )
  },
  {
    value: "회의 일정",
    label: (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" />
          <circle cx="12.7324" cy="12" r="6.5" fill="white" stroke="currentColor" />
          <rect width="8" height="2" transform="translate(8.73242 11)" fill="white" />
          <circle cx="9.73242" cy="12" r="1" fill="currentColor" />
          <circle cx="12.7324" cy="12" r="1" fill="currentColor" />
          <circle cx="15.7324" cy="12" r="1" fill="currentColor" />
          <path d="M6.73205 15L9.23193 18H5L6.73205 15Z" fill="#B7C2D0" />
        </svg>
        <div>회의 일정</div>
      </div>
    )
  }
];

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
      options: ["일일 업무", "회의 일정"],
      description: "활성화 할 value"
    },
    tabItems: {
      control: "select",
      options: tabItems,
      description: "tab의 아이템 리스트"
    },
    defaultValue: {
      control: "select",
      options: ["일일 업무", "회의 일정"],
      description: "초기 활성 tab 값을 설정"
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    width: "360px",
    tabItems,
    defaultValue: "일일 업무"
  },
  render: args => <Tabs {...args} key={`tabs_${args.defaultValue}`} />
};
