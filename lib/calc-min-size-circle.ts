const calculateMinCircleSize = () => {
  if (typeof window === "undefined") {
    return 25;
  }

  const width = window.innerWidth;

  if (width > 1550) {
    return 55;
  } else if (width > 1200) {
    return 42;
  } else if (width > 720) {
    return 35;
  } else {
    return 32;
  }
}

export { calculateMinCircleSize }