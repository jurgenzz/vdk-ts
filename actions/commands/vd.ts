import { nd } from '../../lib/vd';
import { nde } from '../../lib/vd_extended';
import { formatDate, formatDateFromStr } from '../../helpers/formatDate';
import { ReplyAction } from './commandList';
import { BOLD_CHAR } from '../../helpers/chars';

const lookupNames = (msg: string) => {
  let name = msg.toLowerCase();
  let nameFormatted = name;
  let d;
  Object.keys(nd).map(k => {
    let found = nd[k].filter((n: string) => n.toLowerCase() === name);
    if (found && found[0]) {
      d = k
        .split('-')
        .reverse()
        .join('-');
      nameFormatted = found[0];
    }
  });

  if (!d) {
    Object.keys(nde).map(k => {
      let found = nde[k].filter((n: string) => n.toLowerCase() === name);
      if (found && found[0]) {
        d = k
          .split('-')
          .reverse()
          .join('-');
        nameFormatted = found[0];
      }
    });
  }
  if (!d) {
    return `${nameFormatted} nesvin.`;
  }

  let date = formatDateFromStr(d);

  return `${nameFormatted} vārda dienu svin ${(date && date.full) || d}.`;
};

export const getNameDayByDate = (dateFromMsg?: { short: string; full: string }) => {
  let date = formatDate();
  if (dateFromMsg) {
    date = dateFromMsg;
  }

  const names = (nd[date.short] || []).join(', ');

  if (!names.length) {
    return;
  }

  let reply = `Vārda dienu ${dateFromMsg ? '' : 'šodien, '}${date.full}${
    dateFromMsg ? ' ' : ', '
  }svin ${BOLD_CHAR}${names}${BOLD_CHAR}`;

  let extended = nde[date.short];
  if (extended && extended.length > 0) {
    extended = extended.join(', ');
  }

  if (extended) {
    reply += `, kā arī ${extended}`;
  }
  return reply;

};

// export const getNameDayByDate = date => {};

export const vd: ReplyAction = (e, msg) => {
  let date = formatDate();
  let dateFromMsg;
  if (msg) {
    dateFromMsg = formatDateFromStr(msg);

    if (typeof dateFromMsg === 'object') {
      date = dateFromMsg;
    } else {
      return e.reply(lookupNames(msg));
    }
  }

  let reply = getNameDayByDate(date);

  e.reply(`${reply}.`);
};
