const windDirection = dir => {
  const x = parseFloat(dir);
  if ((x > 335.0 && x <= 365.0) || (x > 0 && x <= 25.0)) {
    return 'N';
  } else if (x > 25.0 && x <= 65.0) {
    return 'NE';
  } else if (x > 65.0 && x <= 115.0) {
    return 'E';
  } else if (x > 115.0 && x <= 155.0) {
    return 'SE';
  } else if (x > 155.0 && x <= 205.0) {
    return 'S';
  } else if (x > 205.0 && x <= 245.0) {
    return 'SW';
  } else if (x > 245.0 && x <= 295.0) {
    return 'W';
  } else if (x > 295.0 && x <= 335.0) {
    return 'NW';
  } else if (x === 0) {
    return '';
  } else {
    return '';
  }
};

export default windDirection;
