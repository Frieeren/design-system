import type { Meta, StoryObj } from "@storybook/react";
import { Ripple } from "./Ripple";
import { Button } from "../Button/Button";

const meta: Meta<typeof Ripple> = {
  title: "Components/Ripple",
  component: Ripple,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "리플 효과 비활성화 여부"
    },
    color: {
      control: "color",
      description: "리플 효과 색상"
    },
    duration: {
      control: { type: "range", min: 200, max: 1000, step: 50 },
      description: "애니메이션 지속 시간 (ms)"
    },
    center: {
      control: "boolean",
      description: "중앙에서 시작하는 리플 효과"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <button
      style={{
        width: "200px",
        height: "60px",
        backgroundColor: "#1976d2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        position: "relative",
        cursor: "pointer",
        userSelect: "none"
      }}
      onClick={() => console.log("clicked")}
    >
      클릭해보세요
      <Ripple />
    </button>
  )
};

export const CustomColor: Story = {
  args: {
    color: "rgba(255, 0, 0, 0.3)"
  },
  render: args => (
    <div
      style={{
        width: "200px",
        height: "60px",
        backgroundColor: "#f44336",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        position: "relative",
        cursor: "pointer"
      }}
    >
      빨간색 리플
      <Ripple {...args} />
    </div>
  )
};

export const SlowAnimation: Story = {
  args: {
    duration: 1000
  },
  render: args => (
    <div
      style={{
        width: "200px",
        height: "60px",
        backgroundColor: "#9c27b0",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        position: "relative",
        cursor: "pointer"
      }}
    >
      느린 애니메이션
      <Ripple {...args} />
    </div>
  )
};

export const CenterRipple: Story = {
  args: {
    center: true
  },
  render: args => (
    <div
      style={{
        width: "200px",
        height: "60px",
        backgroundColor: "#4caf50",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        position: "relative",
        cursor: "pointer"
      }}
    >
      중앙 리플
      <Ripple {...args} />
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: args => (
    <div
      style={{
        width: "200px",
        height: "60px",
        backgroundColor: "#ccc",
        color: "#666",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        position: "relative",
        cursor: "not-allowed"
      }}
    >
      비활성화된 리플
      <Ripple {...args} />
    </div>
  )
};

export const CardWithRipple: Story = {
  args: {},
  render: () => (
    <div
      style={{
        width: "200px",
        height: "150px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        position: "relative",
        cursor: "pointer"
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>카드 제목</h4>
        <p style={{ margin: 0, color: "#666" }}>카드 어디든 클릭해보세요</p>
      </div>
      <Ripple />
    </div>
  )
};

export const IconButton: Story = {
  args: {
    center: true
  },
  render: args => (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        position: "relative",
        cursor: "pointer"
      }}
    >
      ❤️
      <Ripple {...args} />
    </div>
  )
};

export const WithButton: Story = {
  args: {},
  render: () => (
    <div style={{ position: "relative" }}>
      <Button type="solid-green">
        asdf
        <Ripple />
      </Button>
    </div>
  )
};

export const MultipleExamples: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div
        style={{
          padding: "12px 24px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          backgroundColor: "#f5f5f5",
          fontSize: "14px",
          fontWeight: "500",
          minWidth: "120px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer"
        }}
      >
        기본 버튼
        <Ripple />
      </div>

      <div
        style={{
          padding: "12px 24px",
          borderRadius: "4px",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "14px",
          fontWeight: "500",
          minWidth: "120px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer"
        }}
      >
        성공 버튼
        <Ripple color="rgba(76, 175, 80, 0.3)" />
      </div>

      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#2196F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "20px",
          position: "relative",
          cursor: "pointer"
        }}
      >
        ⭐
        <Ripple center />
      </div>
    </div>
  )
};
