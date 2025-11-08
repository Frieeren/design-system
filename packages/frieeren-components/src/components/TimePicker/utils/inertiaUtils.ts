/**
 * 관성 스크롤을 위한 유틸리티 함수들
 */

export interface VelocityTracker {
  positions: Array<{ y: number; time: number }>;
  maxSamples: number;
}

/**
 * 속도 추적기 생성
 */
export const createVelocityTracker = (maxSamples: number = 5): VelocityTracker => ({
  positions: [],
  maxSamples
});

/**
 * 위치 추가 (속도 계산을 위해)
 */
export const addPosition = (tracker: VelocityTracker, y: number, time: number): void => {
  tracker.positions.push({ y, time });

  // 최대 샘플 수를 초과하면 오래된 것부터 제거
  if (tracker.positions.length > tracker.maxSamples) {
    tracker.positions.shift();
  }
};

/**
 * 현재 속도 계산 (px/ms)
 */
export const calculateVelocity = (tracker: VelocityTracker): number => {
  if (tracker.positions.length < 2) return 0;

  const recent = tracker.positions[tracker.positions.length - 1];
  const previous = tracker.positions[tracker.positions.length - 2];

  const deltaY = recent.y - previous.y;
  const deltaTime = recent.time - previous.time;

  return deltaTime > 0 ? deltaY / deltaTime : 0;
};

/**
 * 관성 스크롤 거리 계산
 *
 * 물리 공식(v² = u² + 2as)을 사용하여 초기 속도에서 정지할 때까지의 이동 거리 계산
 *
 * @param velocity - 초기 속도 (px/ms)
 * @returns 관성으로 이동할 거리 (px)
 */
export const calculateInertiaDistance = (velocity: number): number => {
  // 감속도: 스크롤이 멈추는 속도를 결정 (값이 클수록 빨리 멈춤)
  const DECELERATION = 0.0007;

  // 최소 속도: 이 값보다 느리면 관성 스크롤을 시작하지 않음
  const MIN_VELOCITY = 0.1;

  const absVelocity = Math.abs(velocity);

  if (absVelocity < MIN_VELOCITY) return 0;

  // v² = u² + 2as에서 s = (v² - u²) / 2a
  // 최종 속도 v = 0이므로 s = -u² / 2a
  const distance = -(velocity * velocity) / (2 * (velocity > 0 ? -DECELERATION : DECELERATION));

  return distance;
};

/**
 * 관성 스크롤 애니메이션을 위한 이징 함수
 */
export const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

/**
 * 관성 스크롤 애니메이션 프레임 계산
 */
export const calculateInertiaFrame = (
  startPosition: number,
  targetPosition: number,
  progress: number
): number => {
  const easedProgress = easeOutQuart(progress);
  return startPosition + (targetPosition - startPosition) * easedProgress;
};

/**
 * 위치를 가장 가까운 아이템으로 스냅
 */
export const snapToNearestItem = (
  position: number,
  itemHeight: number,
  centerOffset: number,
  maxIndex: number
): { position: number; index: number } => {
  const rawIndex = Math.round((centerOffset - position) / itemHeight);
  const clampedIndex = Math.max(0, Math.min(maxIndex, rawIndex));
  const snappedPosition = centerOffset - clampedIndex * itemHeight;

  return {
    position: snappedPosition,
    index: clampedIndex
  };
};

/**
 * 관성 스크롤 지속 시간 계산 (ms)
 */
export const calculateInertiaDuration = (
  velocity: number,
  distance: number,
  minDuration: number = 300,
  maxDuration: number = 1200
): number => {
  const absVelocity = Math.abs(velocity);
  const absDistance = Math.abs(distance);

  // 속도와 거리에 따른 지속 시간 계산
  const duration = Math.sqrt(absDistance) * 50 + absVelocity * 100;

  return Math.max(minDuration, Math.min(maxDuration, duration));
};
