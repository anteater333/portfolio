function deg2RadXYZ(
  x: number = 0,
  y: number = 0,
  z: number = 0
): [number, number, number] {
  const PI = Math.PI;
  return [x * (PI / 180), y * (PI / 180), z * (PI / 180)];
}

export { deg2RadXYZ };
