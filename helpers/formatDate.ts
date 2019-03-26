export const monthNames = [
  'janvārī',
  'februārī',
  'martā',
  'aprīlī',
  'maijā',
  'jūnijā',
  'jūlijā',
  'augustā',
  'septembrī',
  'oktobrī',
  'novembrī',
  'decembrī'
];

export const formatDate = (date: Date = new Date()) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let m = month < 10 ? `0${month}` : month;
  let d = day < 10 ? `0${day}` : day;

  return {
    short: `${m}-${d}`,
    full: `${day}. ${monthNames[month - 1]}`
  };
};

const datePattern = /(\d{1,2})[/-](\d{1,2})/;

export const formatDateFromStr = (msg: string) => {
  const msgIsDate = datePattern.test(msg);
  if (!msgIsDate) {
    return false;
  }

  let [input = '', d1 = '', m1 = ''] = msg.match(datePattern) || [];

  let day = parseInt(d1);
  let month = parseInt(m1);

  let d = day < 10 ? `0${day}` : day;
  let m = month < 10 ? `0${month}` : month;
  return {
    short: `${m}-${d}`,
    full: `${day}. ${monthNames[month - 1]}`
  };
};
