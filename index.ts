import * as irc from 'irc-framework';
import { dev } from './config/dev';
import { onMessage } from './actions/onMessage';
import {setUptime} from './helpers/uptime'

const client = new irc.Client();

client.connect(dev);

client.on('registered', () => {
  console.log('registered');
  client.channel('#meeseekeria');
});

client.on('connected', () => {
  console.log('connected');
  setUptime();
});

client.on('message', onMessage);
