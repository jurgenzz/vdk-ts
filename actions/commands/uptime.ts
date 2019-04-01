import { ReplyAction } from './commandList';
import { getUptime } from '../../helpers/uptime';
import { humanizeDelta } from '../../helpers/humanizeDelta';

export const uptime: ReplyAction = (e, msg) => {
  let up = getUptime();
  e.reply(humanizeDelta(up));
};
