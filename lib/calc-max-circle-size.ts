const calculateMaxCircleSize = () => {
  if (typeof window === "undefined") {
    return 25;
  }

  const width = window.innerWidth;

  if (width > 1550) {
    return 160;
  } else if (width > 700) {
    return 150;
  } else if (width > 550) {
    return 120;
  } else {
    return 80;
  }
}

export { calculateMaxCircleSize }