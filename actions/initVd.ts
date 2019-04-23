import schedule from 'node-schedule';
import { Client } from 'irc-framework';
import { getNameDayByDate } from './commands/vd';

export const initVd = (client: Client, channel: string) => {
  schedule.scheduleJob('0 8,18 * * *', () => {
    let reply = getNameDayByDate();
    if (!reply) {
      return;
    }
    client.say(channel, reply);
  });
};
