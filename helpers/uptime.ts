let uptime = 0;

export const setUptime = () => {
  uptime = new Date().getTime();
};

export const getUptime = () => {
  return new Date().getTime() - uptime;
};
