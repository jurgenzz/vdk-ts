import { vd } from './vd';
import { search } from './search';

export interface ReplyAction {
  (e: Message, m?: string): void;
}

interface Commands {
  [key: string]: ReplyAction;
}

const localCommands: Commands = {
  ping: (e) => e.reply('pong'),
  echo: (e: Message, m?: string) => m && e.reply(m),
  vd,
  search
};

export const getCommand = (cmd: string) => {
  let c: string = cmd.replace(/^!/, '');
  const localCmd = localCommands[c];
  if (localCmd) {
    return localCmd;
  }

  // TODO: get commands from databeiz
};
