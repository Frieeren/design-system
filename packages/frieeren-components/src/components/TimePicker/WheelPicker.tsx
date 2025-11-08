"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import cx from "classnames";
import { WheelPickerProps } from "./TimePicker.type";
import {
  calculateTranslateY,
  calculateIndexFromTranslateY,
  createVelocityTracker,
  addPosition,
  calculateVelocity,
  calculateInertiaDistance,
  calculateInertiaFrame,
  snapToNearestItem,
  calculateInertiaDuration,
  VelocityTracker
} from "./utils";

export const WheelPicker = ({
  values,
  selectedIndex,
  onChange,
  height = 120,
  itemHeight = 40,
  disabled = false,
  className
}: WheelPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragStartTranslateY, setDragStartTranslateY] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 관성 스크롤을 위한 속도 추적
  const velocityTrackerRef = useRef<VelocityTracker>(createVelocityTracker());
  const animationFrameRef = useRef<number>();

  // 선택된 인덱스에 따른 translateY 계산
  const getTranslateY = useCallback(
    (index: number) => calculateTranslateY(index, height, itemHeight),
    [height, itemHeight]
  );

  // 초기 위치 설정
  useEffect(() => {
    setCurrentTranslateY(getTranslateY(selectedIndex));
  }, [selectedIndex, getTranslateY]);

  // Y 좌표를 인덱스로 변환
  const getIndexFromTranslateY = useCallback(
    (translateY: number) =>
      calculateIndexFromTranslateY(translateY, height, itemHeight, values.length - 1),
    [height, itemHeight, values.length]
  );

  // 관성 스크롤 애니메이션
  const animateInertia = useCallback(
    (startPosition: number, velocity: number) => {
      const inertiaDistance = calculateInertiaDistance(velocity);
      const targetPosition = startPosition + inertiaDistance;

      // 가장 가까운 아이템으로 스냅
      const centerOffset = Math.floor(height / itemHeight / 2) * itemHeight;
      const { position: finalPosition, index: finalIndex } = snapToNearestItem(
        targetPosition,
        itemHeight,
        centerOffset,
        values.length - 1
      );

      const duration = calculateInertiaDuration(
        velocity,
        Math.abs(finalPosition - startPosition),
        300,
        1200
      );
      const startTime = Date.now();

      setIsAnimating(true);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentPosition = calculateInertiaFrame(startPosition, finalPosition, progress);
        setCurrentTranslateY(currentPosition);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setCurrentTranslateY(finalPosition);

          if (finalIndex !== selectedIndex) {
            onChange(finalIndex, values[finalIndex]);
          }
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [height, itemHeight, values, selectedIndex, onChange]
  );

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      document.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
      document.removeEventListener("mouseup", handleEnd as unknown as EventListener);
      document.removeEventListener("touchmove", handleTouchMove as unknown as EventListener);
      document.removeEventListener("touchend", handleEnd as unknown as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 터치 시작
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();

      // 진행 중인 애니메이션 중단
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        setIsAnimating(false);
      }

      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setDragStartTranslateY(currentTranslateY);

      // 속도 추적 초기화
      velocityTrackerRef.current = createVelocityTracker(5);
      addPosition(velocityTrackerRef.current, e.touches[0].clientY, Date.now());
    },
    [disabled, currentTranslateY]
  );

  // 마우스 시작
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      // 진행 중인 애니메이션 중단
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        setIsAnimating(false);
      }

      setIsDragging(true);
      setStartY(e.clientY);
      setDragStartTranslateY(currentTranslateY);
      e.preventDefault();
      e.stopPropagation();

      // 속도 추적 초기화
      velocityTrackerRef.current = createVelocityTracker(5);
      addPosition(velocityTrackerRef.current, e.clientY, Date.now());
    },
    [disabled, currentTranslateY]
  );

  // 터치/마우스 이동
  const handleMove = useCallback(
    (clientY: number) => {
      if (!isDragging || disabled) return;

      // 드래그 시작 시점의 위치를 기준으로 새로운 위치 계산
      const deltaY = clientY - startY;
      const newTranslateY = dragStartTranslateY + deltaY;

      setCurrentTranslateY(newTranslateY);

      // 속도 추적을 위한 위치 기록
      addPosition(velocityTrackerRef.current, clientY, Date.now());
    },
    [isDragging, disabled, startY, dragStartTranslateY]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || disabled) return;

      e.preventDefault();
      e.stopPropagation();

      handleMove(e.touches[0].clientY);
    },
    [handleMove, isDragging, disabled]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || disabled) return;

      e.preventDefault();
      e.stopPropagation();

      handleMove(e.clientY);
    },
    [handleMove, isDragging, disabled]
  );

  // 터치/마우스 종료
  const handleEnd = useCallback(() => {
    if (!isDragging || disabled) return;

    setIsDragging(false);

    // 속도 계산 및 관성 거리 계산
    const velocity = calculateVelocity(velocityTrackerRef.current);
    const inertiaDistance = calculateInertiaDistance(velocity);

    // 관성 스크롤 시작 (거리가 0이면 속도가 너무 낮음)
    if (inertiaDistance !== 0) {
      animateInertia(currentTranslateY, velocity);
    } else {
      // 속도가 낮으면 가장 가까운 아이템으로 스냅
      const newIndex = getIndexFromTranslateY(currentTranslateY);
      const finalTranslateY = getTranslateY(newIndex);

      setCurrentTranslateY(finalTranslateY);

      if (newIndex !== selectedIndex) {
        onChange(newIndex, values[newIndex]);
      }
    }
  }, [
    isDragging,
    disabled,
    currentTranslateY,
    selectedIndex,
    onChange,
    values,
    getIndexFromTranslateY,
    getTranslateY,
    animateInertia
  ]);

  // 마우스 이벤트 리스너 등록/해제
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleEnd]);

  // 아이템 클릭 핸들러
  const handleItemClick = useCallback(
    (index: number) => {
      if (disabled || isDragging || isAnimating) return;

      // 진행 중인 애니메이션 중단
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        setIsAnimating(false);
      }

      const newTranslateY = getTranslateY(index);
      setCurrentTranslateY(newTranslateY);
      onChange(index, values[index]);
    },
    [disabled, isDragging, isAnimating, getTranslateY, onChange, values]
  );

  return (
    <div
      ref={containerRef}
      className={cx("wheel-picker", className, {
        "wheel-picker--disabled": disabled,
        "wheel-picker--dragging": isDragging
      })}
      style={{ height }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      role="listbox"
      tabIndex={disabled ? -1 : 0}
      aria-label="Time picker wheel"
    >
      <div
        className="wheel-picker__items"
        style={{
          transform: `translateY(${currentTranslateY}px)`,
          transition: isDragging || isAnimating ? "none" : "transform 0.3s ease-out"
        }}
      >
        {values.map((value, index) => {
          return (
            <div
              key={`${value}-${index}`}
              className={cx("wheel-picker__item", {
                "wheel-picker__item--selected": index === selectedIndex
              })}
              style={{ height: itemHeight }}
              onClick={() => handleItemClick(index)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(index);
                }
              }}
              role="option"
              tabIndex={-1}
              aria-selected={index === selectedIndex}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
