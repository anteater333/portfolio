export type RGB = `rgb(${number}, ${number}, ${number})`;

/**
 * 0 ~ 100 사이 값을 사용해 시작 RGB값과 끝 RGB값 사이의 RGB값을 계산해 반환한다.
 *
 * @param percentage 퍼센트 [0 ~ 100], 범위 밖의 값은 각각 최소/최대값으로 반환
 * @param from 0%일 때 RGB 값, 기본 rgb(34, 34, 34)
 * @param to 100%일 때 RGB 값, 기본 rgb(242, 242, 242)
 */
export function calcRGBByPercentage(
  percentage: number,
  from?: number,
  to?: number
): RGB {
  from ??= 34;
  to ??= 242;
  from = from <= 0 ? 0 : Math.ceil(from);
  to = from >= 255 ? 255 : Math.ceil(to);
  percentage = Math.ceil(percentage);

  const getGrayRGBStr = (num: number): RGB => `rgb(${num}, ${num}, ${num})`;

  if (percentage <= 0) return getGrayRGBStr(from);
  if (percentage >= 100) return getGrayRGBStr(to);

  let result = Math.ceil((to - from) * (percentage / 100)) + from;

  return getGrayRGBStr(result);
}
