export const getAngle = (vector1: number[], vector2: number[]) => {
  const dot = vector1[0] * vector2[0] + vector1[1] * vector2[1];
  const det = vector1[0] * vector2[1] - vector1[1] * vector2[0];
  const angle = (Math.atan2(det, dot) / Math.PI) * 180;

  return (angle + 360) % 360;
};
