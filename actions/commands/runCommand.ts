//@ts-nocheck
import axios from 'axios';
import * as _ from 'lodash';
import { loadScripts } from '../../helpers/loadScripts';

const scripts = loadScripts();

export const runCommand = async (command: string, event: Message) => {
  // console.log(command);
  try {
    let ivm = require('isolated-vm');
    let isolate = new ivm.Isolate({ memoryLimit: 128 });

    let context = await isolate.createContext();

    let jail = context.global;
    jail.setSync('global', jail.derefInto());
    jail.setSync('_ivm', ivm);

    jail.setSync('_input', event.message);

    jail.setSync(
      '_axios',
      new ivm.Reference((str: string, config: any = {}) => {
        return new Promise(async (resolve, reject) => {
          let re = await axios(str, config);
          resolve(new ivm.ExternalCopy(re.data).copyInto());
        });
      })
    );

    await (await isolate.compileScript(`
    global.scripts = {};
    ${scripts
      .map(
        ([name, script]: [string, string]) => `
        (function() {
            const module = {};
            const exports = {};
            ${script};
            global.scripts[${JSON.stringify(name)}] = module.exports;
        })();
    `
      )
      .join('')}
    `)).run(context);

    jail.setSync(
      '_print',
      //@ts-ignore
      new ivm.Reference(function(reply) {
        event.reply(reply);
      })
    );

    jail.setSync(
      '_log',
      //@ts-ignore
      new ivm.Reference(function(...args) {
        console.log(...args);
      })
    );

    let bootstrap = isolate.compileScriptSync(
      'new ' +
        function() {
          //@ts-ignore
          let print = _print;

          //@ts-ignore
          global.ivm = _ivm;
          //@ts-ignore
          delete global._ivm;

          //@ts-ignore
          global.input = _input;

          //@ts-ignore
          delete global._input;

          //@ts-ignore
          global._ = { ...scripts.lodash };
          
          //@ts-ignore
          let axios = _axios;
          //@ts-ignore
          global.axios = async (str, config) => {
            //@ts-ignore
            return new Promise(async (resolve, reject) => {
              let re = await axios.applySyncPromise(undefined, [
                str,
                //@ts-ignore
                new global.ivm.ExternalCopy(config).copyInto()
              ]);
              resolve(re);
            });
          };

          //@ts-ignore
          global.print = function(...args) {
            print.applyIgnored(undefined, args);
          };

          //@ts-ignore
          global.log = function(...args) {
            //@ts-ignore
            _log.applyIgnored(undefined, args);
          };
        }
    );

    bootstrap.run(context);

    console.log(command);

    await isolate
      .compileScriptSync(
        `
        (async () => {
            ${command}
        })()
        `
      )
      .run(context);
  } catch (err) {
    event.reply('> ' + err.message);

  }
};
