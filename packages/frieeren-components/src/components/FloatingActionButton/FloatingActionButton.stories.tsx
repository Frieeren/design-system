import { Meta, StoryObj } from "@storybook/react";
import { FloatingActionButton } from "./FloatingActionButton";
import { AddIcon } from "@team-frieeren/icons";

const meta = {
  title: "v2/Components/FloatingActionButton",
  component: FloatingActionButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "floating action button의 크기를 지정"
    },
    disabled: {
      control: "boolean",
      description: "floating action button의 비활성화 상태를 지정"
    },
    loading: {
      control: "boolean",
      description: "floating action button의 로딩 상태를 지정"
    },
    type: {
      control: "select",
      options: [
        "base",
        "solid-green",
        "solid-red",
        "solid-gray",
        "outline-green",
        "outline-red",
        "outline-gray",
        "text-none"
      ],
      description: "floating action button의 타입을 지정"
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
    }
  }
} satisfies Meta<typeof FloatingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    size: "large",
    children: <AddIcon />,
    type: "solid-green",
    position: "absolute",
    bottom: 0
  }
};

export const CreateButton: Story = {
  args: {
    size: "large",
    children: <AddIcon />,
    type: "solid-green",
    position: "absolute"
  },
  render: args => (
    <div
      style={{
        position: "relative",
        width: "400px",
        minHeight: "100vh",
        maxWidth: "400px",
        margin: "0 auto",
        background: "#f0f0f0"
      }}
    >
      <FloatingActionButton {...args} />
    </div>
  )
};
