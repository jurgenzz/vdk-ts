import { dev } from '../config/dev';
import { getCommand } from './commands/commandList';

export const onMessage = (event: Message) => {
  if (event.nick === dev.nick) {
    return;
  }
  
  let message;

  const nickPattern = new RegExp(`^${dev.nick}[,:]{1} ?`);

  if (nickPattern.test(event.message)) {
    message = event.message.replace(nickPattern, '!');
  } else {
    message = event.message;
  }

  let matchCommand = message.match(/^!\w+/);
  let cmd = matchCommand && matchCommand[0];

  if (!cmd) {
    return;
  }

  const action = getCommand(cmd);
  
  if (action) {
    message = message.replace(cmd, '');
    message = message.replace(/^\ /, '');
    action(event, message);
  }
};
