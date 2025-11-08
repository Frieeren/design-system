import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "./TimePicker";
import { TimeValue } from "./TimePicker.type";
import "./TimePicker.scss";

const meta = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    use24Hour: {
      control: "boolean",
      description: "24시간 형식 사용 여부"
    },
    minuteStep: {
      control: { type: "number", min: 1, max: 30 },
      description: "분 단위 간격"
    },
    disabled: {
      control: "boolean",
      description: "컴포넌트 비활성화 여부"
    }
  }
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 24시간 형식
export const Default: Story = {
  render: function DefaultRender(args) {
    const [time, setTime] = useState<TimeValue>({ hour: 10, minute: 30 });

    return (
      <div style={{ padding: "20px" }}>
        <TimePicker {...args} value={time} onChange={setTime} use24Hour={false} />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          선택된 시간: {time.hour.toString().padStart(2, "0")}:
          {time.minute.toString().padStart(2, "0")}
        </div>
      </div>
    );
  },
  args: {
    use24Hour: true,
    minuteStep: 1,
    disabled: false
  }
};

// 12시간 형식 (AM/PM)
export const TwelveHourFormat: Story = {
  render: function TwelveHourFormatRender(args) {
    const [time, setTime] = useState<TimeValue>({ hour: 14, minute: 30 });

    return (
      <div style={{ padding: "20px" }}>
        <TimePicker {...args} value={time} onChange={setTime} use24Hour={false} />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          선택된 시간: {time.hour.toString().padStart(2, "0")}:
          {time.minute.toString().padStart(2, "0")}
        </div>
      </div>
    );
  },
  args: {
    use24Hour: false,
    minuteStep: 1,
    disabled: false
  }
};

// 15분 간격
export const FifteenMinuteStep: Story = {
  render: function FifteenMinuteStepRender(args) {
    const [time, setTime] = useState<TimeValue>({ hour: 9, minute: 0 });

    return (
      <div style={{ padding: "20px" }}>
        <TimePicker {...args} value={time} onChange={setTime} minuteStep={15} />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          선택된 시간: {time.hour.toString().padStart(2, "0")}:
          {time.minute.toString().padStart(2, "0")}
        </div>
      </div>
    );
  },
  args: {
    use24Hour: true,
    minuteStep: 15,
    disabled: false
  }
};

// 시간 범위 제한
export const WithTimeRange: Story = {
  render: function WithTimeRangeRender(args) {
    const [time, setTime] = useState<TimeValue>({ hour: 10, minute: 0 });

    return (
      <div style={{ padding: "20px" }}>
        <TimePicker
          {...args}
          value={time}
          onChange={setTime}
          minTime={{ hour: 9, minute: 0 }}
          maxTime={{ hour: 18, minute: 0 }}
        />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          선택된 시간: {time.hour.toString().padStart(2, "0")}:
          {time.minute.toString().padStart(2, "0")}
          <br />
          <small style={{ color: "#666" }}>(9:00 ~ 18:00 범위 내에서만 선택 가능)</small>
        </div>
      </div>
    );
  },
  args: {
    use24Hour: true,
    minuteStep: 1,
    disabled: false
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: function DisabledRender(args) {
    const [time, setTime] = useState<TimeValue>({ hour: 12, minute: 0 });

    return (
      <div style={{ padding: "20px" }}>
        <TimePicker {...args} value={time} onChange={setTime} disabled={true} />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          선택된 시간: {time.hour.toString().padStart(2, "0")}:
          {time.minute.toString().padStart(2, "0")}
        </div>
      </div>
    );
  },
  args: {
    use24Hour: true,
    minuteStep: 1,
    disabled: true
  }
};
