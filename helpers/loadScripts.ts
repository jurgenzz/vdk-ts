const fs = require('fs');
const path = require('path');

const dir = __dirname + '../../../lib'

export const loadScripts = () => {
  return fs
    .readdirSync(path.join(dir, 'scripts'))
    .map((filename: string) => [
      path.parse(filename).name,
      fs.readFileSync(path.join(dir, 'scripts', filename), 'utf8')
    ]);
};
