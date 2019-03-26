import * as irc from 'irc-framework';
import { dev } from './config/dev';
import {onMessage} from './actions/onMessage';

const client = new irc.Client();

client.connect(dev);

client.on('registered', () => {
  console.log('registered');
  client.channel('#meeseekeria');
});

client.on('message', onMessage);
