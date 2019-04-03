import { ReplyAction } from './commandList';
import { stringToMs } from '../../helpers/humanizeDelta';
import schedule from 'node-schedule';

export const remind: ReplyAction = (e, msg) => {
  if (!msg) {
    return;
  }
  
  let timeStamp = msg && msg.split(' ')[0]; // returns 7d4h, 7d, 1d, 2w,
  let dates = timeStamp.match(/\d+[wdhms]/g);
  msg = msg.replace(timeStamp, '');
  msg = msg.replace(/^\ /, '');

  if (!msg || !dates) {
    return;
  }

  let seconds = dates.reduce((s, date) => s + stringToMs(date), 0);

  e.reply(`${e.nick} will be reminder about "${msg}" in ${dates.join(', ')} (${seconds}).`);

  let d = new Date().getTime() + seconds * 1000;
  let reminderDate = new Date(d);

  schedule.scheduleJob(reminderDate, () => {
    e.reply(`${msg}`);
  });
};
