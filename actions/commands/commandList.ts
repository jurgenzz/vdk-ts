import { vd } from './vd';
import { search } from './search';
import { uptime } from './uptime';
import { weather } from './weather';

export interface ReplyAction {
  (e: Message, m?: string): void;
}

interface Commands {
  [key: string]: ReplyAction;
}

const localCommands: Commands = {
  ping: e => e.reply('pong'),
  echo: (e, m) => m && e.reply(m),
  vd,
  search,
  uptime,
  weather
};

export const getCommand = (cmd: string) => {
  let c: string = cmd.replace(/^!/, '');
  const localCmd = localCommands[c];
  if (localCmd) {
    return localCmd;
  }

  // TODO: get commands from databeiz
};
