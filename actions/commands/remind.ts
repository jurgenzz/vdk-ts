import { ReplyAction } from './commandList';
import { stringToMs } from '../../helpers/humanizeDelta';
import { saveReminder, removeReminder } from '../../helpers/saveReminder';
import schedule from 'node-schedule';

export const remind: ReplyAction = async (e, msg) => {
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

  let reply = `${e.nick}, a reminder for you: ${msg}`;

  let reminder: number = await saveReminder(reminderDate, reply, e.target);

  schedule.scheduleJob(reminderDate, () => {
    e.reply(`${reply}`);
    removeReminder(reminder);
  });
};
