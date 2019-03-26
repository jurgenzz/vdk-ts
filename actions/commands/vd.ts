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

export const vd: ReplyAction = (e, msg) => {
  // todo
  // vd checkum
  let date = formatDate();

  if (msg) {
    let dateFromMsg = formatDateFromStr(msg);

    if (dateFromMsg) {
      date = dateFromMsg;
    } else {
      return e.reply(lookupNames(msg));
    }
  }

  console.log(date.short);
  const names = (nd[date.short] || []).join(', ');

  if (!names.length) {
    return;
  }
  let reply = `Vārda dienu šodien, ${date.full}, ${BOLD_CHAR}${names}${BOLD_CHAR}`;

  let extended = nde[date.short];
  if (extended && extended.length > 0) {
    extended = extended.join(', ');
  }

  if (extended) {
    reply += `, kā arī ${extended}`;
  }

  e.reply(`${reply}.`);
};
