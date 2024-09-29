const calculateMinCircleSize = () => {
  if (typeof window === "undefined") {
    return 25;
  }

  const width = window.innerWidth;

  if (width > 1550) {
    return 55;
  } else if (width > 1200) {
    return 45;
  } else if (width > 770) {
    return 55;
  } else {
    return 35;
  }
}

export { calculateMinCircleSize }