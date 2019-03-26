import { ReplyAction } from './commandList';

export const search: ReplyAction = (e, msg) => {
  let query = '';

  if (!msg) {
    e.reply('Usage: !search query nick:vdk');
    return;
  }

  let queries = msg && msg.match(/(\w+:\w+)/g);
  let reply = msg && msg.replace(/(\w+:\w+)/g, '');
  
  // trim white space
  reply = reply.replace(/(^\ )|(\ $)/g, '')

  if (queries && queries.length) {
    queries.forEach(q => {
      const [k, v] = q.split(':');
      if (!v) {
        return;
      }
      query += `&${k}=${encodeURIComponent(v)}`;
    });
  }

  e.reply(`https://developers.lv/?search${reply ? `&text=${encodeURIComponent(reply)}` : ''}${query}`);
};
