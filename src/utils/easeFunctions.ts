/** Ease functions for Animation. */

/**
 * 1을 살짝 초과 후 1로 복귀
 */
export function easeInBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return c3 * x * x * x - c1 * x * x;
}

/**
 * 0에서 살짝 내려간 후 1로 상승
 */
export function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
