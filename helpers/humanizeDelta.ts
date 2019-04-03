interface Mapping {
  [key: string]: number;
}

const DURATION_MAPPING: Mapping = {
  y: 60 * 60 * 24 * 365,
  w: 60 * 60 * 24 * 7,
  d: 60 * 60 * 24,
  h: 60 * 60,
  m: 60,
  s: 1
};

export const humanizeDelta = (delta: number) => {
  // Turns `12345678` into `3h 25m 45s`.

  let d = delta;
  let durations: any[] = [];

  Object.entries(DURATION_MAPPING).forEach(([durationKey, duration]) => {
    // let duration: number = DURATION_MAPPING[durationKey];
    if (duration <= d) {
      duration *= 1000;
      let count: number = Math.floor(d / duration);

      d -= duration * count;
      if (count) {
        durations.push([durationKey, count]);
      }
    }
  });

  return durations.map(([name, count]) => `${count}${name}`).join(' ');
};

export const stringToMs = (amount: string) => {
  if (!amount) {
    return 0;
  }
  let value = (amount.match(/\d+/) || [])[0];
  let key = (amount.match(/[a-z]/) || [])[0];

  if (!value || !key) {
    return 0;
  }

  if (DURATION_MAPPING[key]) {
    return parseInt(value) * DURATION_MAPPING[key];
  }
  return 0;
};
