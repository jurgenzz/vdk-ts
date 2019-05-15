import connect from 'connect';
import bodyParser from 'body-parser';
import router from 'connect-route';
import serveStatic from 'serve-static';

import { getCommandsFromDb, saveCommand } from '../db/index';

const app = connect();

app.use(bodyParser());

interface IRoute {
  get(path: string, callback: (req: any, res: any) => void): void;
  post(path: string, callback: (req: any, res: any) => void): void;
}

app.use(
  router((route: IRoute) => {
    route.get('/n', (req, res) => {
      let q = req.url.replace(/\/n\?q=+/, '');
      if (q) {
        res.writeHead(301, {
          Location: 'http://www.pmlp.gov.lv/lv/sakums/statistika/personvardu-datu-baze/?id=137&query=' + q
        });
        res.end('redirect');
      } else {
        res.writeHead(301, { Location: 'http://vd.jurg.is' });
        res.end('redirect');
      }
    });

    route.get('/api/commands', async (req, res) => {
      let commands = await getCommandsFromDb();

      res.end(JSON.stringify(commands || {}));
    });

    route.post('/api/saveCmd', async (req, res) => {
      let { name, value } = req.body;

      if (!name || !value) {
        res.end(JSON.stringify({ success: false }));
        return;
      }

      let commands: any = await getCommandsFromDb();

      if (!commands[name]) {
        await saveCommand(name, value);
        res.end(JSON.stringify({ success: true }));
        return;
      } else {
        res.end(JSON.stringify({ success: false }));
      }
      
      
    });
  })
);

//@ts-ignore
app.use(serveStatic(__dirname + '/../../web/public')).listen(3000, function() {
  console.log('Server running on 3000...');
});
