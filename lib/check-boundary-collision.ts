type Props = {
  pos: number
  radius: number
  max: number
  velocity: number
  wallDamping: number
}

const checkBoundaryCollision = ({ pos, radius, max, velocity, wallDamping }: Props) => {
  if (pos - radius < 0) {
    pos = radius;
    velocity *= -1;
    velocity *= 1 - wallDamping;
  } else if (pos + radius > max) {
    pos = max - radius;
    velocity *= -1;
    velocity *= 1 - wallDamping;
  }
  return { pos, velocity };
};

export { checkBoundaryCollision }