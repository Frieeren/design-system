import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const meta = {
  title: "v2/Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "boolean",
      description: "토글의 현재 상태를 설정합니다"
    },
    onChange: {
      action: "pressed changed",
      description: "토글 상태가 변경될 때 호출되는 콜백 함수"
    },
    disabled: {
      control: "boolean",
      description: "토글의 비활성화 상태를 설정합니다"
    },
    value: {
      control: "boolean",
      description: "토글의 현재 상태를 설정합니다"
    }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  render: args => <Switch {...args} />
};

export const Disabled: Story = {
  args: {},
  render: args => <Switch {...args} disabled />
};

export const SwitchGroup: Story = {
  args: {},
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>ON</div>
        <Switch defaultValue />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>OFF</div>
        <Switch />
      </div>
    </div>
  )
};
