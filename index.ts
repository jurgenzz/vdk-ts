import * as irc from 'irc-framework';
import { dev } from './config/dev';
import { onMessage } from './actions/onMessage';
import { setUptime } from './helpers/uptime';
import { initVd } from './actions/initVd';
import { getAllReminders, removeReminder } from './helpers/saveReminder';
import { scheduleJob } from 'node-schedule';
import './server'

const client = new irc.Client();

client.connect(dev);

client.on('registered', async () => {
  console.log('registered');
  client.channel('#meeseekeria');
  initVd(client, '#meeseekeria');
  let reminders = await getAllReminders();
  reminders.map(reminder => {
    scheduleJob(new Date(reminder.date), () => {
      client.say(reminder.channel, reminder.msg);
      removeReminder(reminder.ID);
    });
  });
});

client.on('connected', () => {
  console.log('connected');
  setUptime();
});

client.on('message', onMessage);
