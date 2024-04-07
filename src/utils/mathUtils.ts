function deg2RadXYZ(
  x: number = 0,
  y: number = 0,
  z: number = 0
): [number, number, number] {
  const PI = Math.PI;
  return [x * (PI / 180), y * (PI / 180), z * (PI / 180)];
}

/**
 * 중앙값에 치중된 랜덤
 */
function weightedRandom(max: number, bellFactor: number) {
  var num = 0;
  for (var i = 0; i < bellFactor; i++) {
    num += Math.random() * (max / bellFactor);
  }
  return num;
}

export { deg2RadXYZ, weightedRandom };
