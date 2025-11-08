/**
 * 선택된 인덱스에 따른 translateY 계산
 */
export const calculateTranslateY = (index: number, height: number, itemHeight: number): number => {
  const centerOffset = Math.floor(height / itemHeight / 2) * itemHeight;
  return centerOffset - index * itemHeight;
};

/**
 * translateY 값을 인덱스로 변환
 */
export const calculateIndexFromTranslateY = (
  translateY: number,
  height: number,
  itemHeight: number,
  maxIndex: number
): number => {
  const centerOffset = Math.floor(height / itemHeight / 2) * itemHeight;
  const index = Math.round((centerOffset - translateY) / itemHeight);
  return Math.max(0, Math.min(maxIndex, index));
};

/**
 * 터치/마우스 이벤트에서 Y 좌표 추출
 */
export const getClientY = (
  event: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent
): number => {
  if ("touches" in event) {
    return event.touches[0]?.clientY || 0;
  }
  return event.clientY;
};

/**
 * 드래그 델타 계산
 */
export const calculateDragDelta = (
  currentY: number,
  startY: number,
  selectedIndex: number,
  height: number,
  itemHeight: number
): number => {
  const deltaY = currentY - startY;
  const baseTranslateY = calculateTranslateY(selectedIndex, height, itemHeight);
  return baseTranslateY + deltaY;
};
