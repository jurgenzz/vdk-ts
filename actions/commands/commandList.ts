import { vd } from './vd';
import { search } from './search';
import { uptime } from './uptime';
import { weather } from './weather';
import { remind } from './remind';

import { getCommandsFromDb } from '../../db/index';

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
  weather,
  remind
};

export const getCommand = async (cmd: string) => {
  let c: string = cmd.replace(/^!/, '');
  const localCmd = localCommands[c];
  if (localCmd) {
    return localCmd;
  }

  let commands: any = await getCommandsFromDb();

  if (commands[c]) {
    return (e: Message) => e.reply(commands[c]);
  }
};
