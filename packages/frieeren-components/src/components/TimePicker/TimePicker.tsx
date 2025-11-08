"use client";

import { useState, useCallback, useMemo } from "react";
import cx from "classnames";
import { TimePickerProps, TimeValue, TimePickerState, AmPm } from "./TimePicker.type";
import { WheelPicker } from "./WheelPicker";
import {
  convertTo12Hour,
  convertTo24Hour,
  isTimeInRange,
  generateHourValues,
  generateMinuteValues,
  generateAmPmValues,
  getSelectedHourIndex,
  getSelectedMinuteIndex,
  getSelectedAmPmIndex
} from "./utils";

export const TimePicker = ({
  value,
  onChange,
  use24Hour = true,
  minuteStep = 1,
  disabled = false,
  className,
  minTime,
  maxTime
}: TimePickerProps) => {
  const defaultTime: TimeValue = { hour: 10, minute: 0 };
  const currentTime = value || defaultTime;

  const [internalState, setInternalState] = useState<TimePickerState>(() => {
    if (use24Hour) {
      return {
        hour: currentTime.hour,
        minute: currentTime.minute
      };
    } else {
      const { hour12, ampm } = convertTo12Hour(currentTime.hour);
      return {
        hour: hour12,
        minute: currentTime.minute,
        ampm
      };
    }
  });

  const hourValues = useMemo(() => generateHourValues(use24Hour), [use24Hour]);
  const minuteValues = useMemo(() => generateMinuteValues(minuteStep), [minuteStep]);
  const ampmValues = generateAmPmValues();

  const selectedHourIndex = useMemo(
    () => getSelectedHourIndex(currentTime.hour, use24Hour),
    [currentTime.hour, use24Hour]
  );

  const selectedMinuteIndex = useMemo(
    () => getSelectedMinuteIndex(currentTime.minute, minuteStep),
    [currentTime.minute, minuteStep]
  );

  const selectedAmPmIndex = useMemo(() => {
    if (use24Hour) return 0;
    return getSelectedAmPmIndex(currentTime.hour);
  }, [currentTime.hour, use24Hour]);

  const handleHourChange = useCallback(
    (index: number, value: string | number) => {
      let newHour: number;

      if (use24Hour) {
        newHour = index;
      } else {
        const hour12 = parseInt(value.toString());
        newHour = convertTo24Hour(hour12, internalState.ampm!);
      }

      const newTime: TimeValue = { hour: newHour, minute: currentTime.minute };

      if (!isTimeInRange(newTime, minTime, maxTime)) {
        return;
      }

      setInternalState(prev => ({
        ...prev,
        hour: use24Hour ? newHour : parseInt(value.toString())
      }));
      onChange?.(newTime);
    },
    [use24Hour, internalState.ampm, currentTime.minute, minTime, maxTime, onChange]
  );

  const handleMinuteChange = useCallback(
    (_: number, value: string | number) => {
      const newMinute = parseInt(value.toString());
      const newTime: TimeValue = { hour: currentTime.hour, minute: newMinute };

      if (!isTimeInRange(newTime, minTime, maxTime)) {
        return;
      }

      setInternalState(prev => ({ ...prev, minute: newMinute }));
      onChange?.(newTime);
    },
    [currentTime.hour, minTime, maxTime, onChange]
  );

  const handleAmPmChange = useCallback(
    (_: number, value: string | number) => {
      const newAmPm = value as AmPm;
      const currentHour12 = internalState.hour;

      const newHour = convertTo24Hour(currentHour12, newAmPm);

      const newTime: TimeValue = { hour: newHour, minute: currentTime.minute };

      if (!isTimeInRange(newTime, minTime, maxTime)) {
        return;
      }

      setInternalState(prev => ({ ...prev, ampm: newAmPm }));
      onChange?.(newTime);
    },
    [internalState.hour, currentTime.minute, minTime, maxTime, onChange]
  );

  return (
    <div
      className={cx("time-picker", className, {
        "time-picker--disabled": disabled,
        "time-picker--24hour": use24Hour,
        "time-picker--12hour": !use24Hour
      })}
      data-frieeren-component="TimePicker"
    >
      <div className="time-picker__wheels">
        <div className="time-picker__center-section">
          <div className="time-picker__center-separator">:</div>
        </div>
        {/* HOUR WHEEL */}
        <div className="time-picker__wheel-container">
          <WheelPicker
            values={hourValues}
            selectedIndex={selectedHourIndex}
            onChange={handleHourChange}
            disabled={disabled}
            className="time-picker__hour-wheel"
          />
        </div>

        {/* MINUTE WHEEL */}
        <div className="time-picker__wheel-container">
          <WheelPicker
            values={minuteValues}
            selectedIndex={selectedMinuteIndex}
            onChange={handleMinuteChange}
            disabled={disabled}
            className="time-picker__minute-wheel"
          />
        </div>

        {/* AM/PM WHEEL (12HOUR FORMAT ONLY) */}
        {!use24Hour && (
          <div className="time-picker__wheel-container">
            <WheelPicker
              values={ampmValues}
              selectedIndex={selectedAmPmIndex}
              onChange={handleAmPmChange}
              disabled={disabled}
              className="time-picker__ampm-wheel"
            />
          </div>
        )}
      </div>
    </div>
  );
};

TimePicker.displayName = "TimePicker";
