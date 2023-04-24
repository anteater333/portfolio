import { RGB, calcRGBByPercentage } from "./styleUtil";

describe("calcRGBByPercentage()", () => {
  test("RGB 문자열을 반환한다.", () => {
    const result = calcRGBByPercentage(0);

    const expected = `rgb(34, 34, 34)`;

    expect(result).toMatch(/^rgb\((\d+), (\d+), (\d+)\)$/);
    expect(result).toBe(expected);
  });

  test("비율에 알맞은 RGB 값을 반환한다.", () => {
    const from = 34;
    const to = 255;
    const percentage = 50;

    const expected: RGB = `rgb(${145}, ${145}, ${145})`;

    const result = calcRGBByPercentage(percentage, from, to);

    expect(result).toBe(expected);
  });

  test("비율을 벗어난 값은 각각 최대/최소 RGB값으로 반환한다.", () => {
    const from = 30;
    const to = 244;

    const fromRGB: RGB = `rgb(${30}, ${30}, ${30})`;
    const toRGB: RGB = `rgb(${244}, ${244}, ${244})`;

    const resultUnder = calcRGBByPercentage(-1, from, to);
    const resultOver = calcRGBByPercentage(101, from, to);

    expect(resultUnder).toBe(fromRGB);
    expect(resultOver).toBe(toRGB);
  });
});
