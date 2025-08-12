import { Meta, StoryObj } from "@storybook/react";
import { FloatingActionButton } from "./FloatingActionButton";

const OpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path
      d="M10.2725 0C10.8246 0.000193732 11.2725 0.447835 11.2725 1V9H19.2734C19.8255 9.00021 20.2734 9.44784 20.2734 10C20.2734 10.5522 19.8255 10.9998 19.2734 11H11.2725V19C11.2725 19.5522 10.8246 19.9998 10.2725 20C9.72018 20 9.27246 19.5523 9.27246 19V11H1.27344C0.721153 11 0.273438 10.5523 0.273438 10C0.273437 9.44771 0.721153 9 1.27344 9H9.27246V1C9.27246 0.447715 9.72018 -4.13814e-08 10.2725 0Z"
      fill="white"
    />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M1.20124 0.929623C1.59178 0.539352 2.22501 0.539183 2.61545 0.929623L8.2723 6.58648L13.9298 0.928932C14.3204 0.538682 14.9536 0.538499 15.3441 0.928932C15.7345 1.31937 15.7343 1.9526 15.3441 2.34315L9.68652 8.00069L15.3434 13.6575C15.7338 14.048 15.7336 14.6812 15.3434 15.0718C14.9528 15.4623 14.3197 15.4623 13.9292 15.0718L8.2723 9.4149L2.61614 15.0711C2.22562 15.4616 1.59245 15.4616 1.20193 15.0711C0.811402 14.6805 0.811403 14.0474 1.20193 13.6569L6.85809 8.00069L1.20124 2.34384C0.810712 1.95331 0.810712 1.32015 1.20124 0.929623Z"
      fill="white"
    />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M6.95215 17.9932L0.757809 19.2422L2.00781 13.0488L6.95215 17.9932ZM17.2422 7.70313L6.95312 17.9922L2.00781 13.0469L12.2959 2.75781L17.2422 7.70313ZM19.7139 5.23047L17.791 7.15332L12.8467 2.20801L14.7695 0.285159L19.7139 5.23047Z"
      fill="#61A4FF"
    />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
    <path
      d="M5.41504 0.960938C5.80569 0.960939 6.00192 0.961372 6.1709 1.02442C6.31996 1.08018 6.45449 1.17029 6.56152 1.28809C6.68275 1.42162 6.75522 1.60388 6.90039 1.9668L7.43359 3.30078L19.3408 3.30078L19.3408 16.1445L0.659177 16.1445L0.659179 2.56055C0.65918 2.00075 0.660563 1.7207 0.769531 1.50684C0.865377 1.31896 1.01815 1.16612 1.20605 1.07031C1.41987 0.961541 1.70031 0.960938 2.25977 0.960938L5.41504 0.960938Z"
      fill="#61A4FF"
    />
  </svg>
);

const meta = {
  title: "v2/Components/FloatingActionButton",
  component: FloatingActionButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "floating action button의 비활성화 상태를 지정"
    },
    position: {
      control: "select",
      options: ["fixed", "absolute"],
      description: "floating action button의 위치를 지정"
    },
    top: {
      control: "number",
      description: "floating action button의 위치를 지정"
    },
    left: {
      control: "number",
      description: "floating action button의 위치를 지정"
    },
    bottom: {
      control: "number",
      description: "floating action button의 위치를 지정"
    },
    right: {
      control: "number",
      description: "floating action button의 위치를 지정"
    },
    actions: {
      control: "object",
      description: "확장 가능한 액션 버튼들의 배열"
    },
    icon: {
      control: "object",
      description: "메인 버튼의 아이콘"
    },
    openIcon: {
      control: "object",
      description: "메인 버튼의 열린 아이콘"
    },
    closeIcon: {
      control: "object",
      description: "메인 버튼의 닫힌 아이콘"
    }
  }
} satisfies Meta<typeof FloatingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    openIcon: <OpenIcon />,
    closeIcon: <CloseIcon />,
    position: "absolute",
    bottom: 0,
    actions: [
      {
        icon: <AddIcon />
      },
      {
        icon: <FileIcon />
      }
    ]
  },
  render: args => <FloatingActionButton {...args} />
};
