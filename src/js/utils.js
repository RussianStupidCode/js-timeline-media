export function dateFormat(momentDate) {
  return momentDate.format('YYYY-MM-DD HH:mm:ss');
}

export function coordinateParse(coordinateString) {
  const regex = /\[?\s?(-?\d+[.]?\d{0,}),?\s(-?\d+[.]?\d{0,})\s?\]?$/;

  const match = coordinateString.match(regex);

  if (!match) {
    throw new Error('uncorrect coordinate');
  }

  const latitude = Number(match[1]);
  const longitude = Number(match[2]);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new Error('uncorrect coordinate');
  }

  return [latitude, longitude];
}
