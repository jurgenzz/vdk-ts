import * as irc from 'irc-framework';
import { dev } from './config/dev';
import { onMessage } from './actions/onMessage';
import { setUptime } from './helpers/uptime';
import { initVd } from './actions/initVd';

const client = new irc.Client();

client.connect(dev);

client.on('registered', () => {
  console.log('registered');
  client.channel('#meeseekeria');
  initVd(client, '#meeseekeria');
});

client.on('connected', () => {
  console.log('connected');
  setUptime();
});

client.on('message', onMessage);
