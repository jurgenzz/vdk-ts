//@ts-ignore
__webpack_public_path__ = '/js/'


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { CommandList } from './CommandList';

export interface Command {
  [key: string]: string;
}

const init = async () => {
  let commands = (await axios.get('/api/commands')).data;
  ReactDOM.render(<App commands={commands} />, document.getElementById('app'));
};
init();

const onAdd = async (command: string, reply: string) => {
  let re = await axios.post('/api/saveCmd', { name: command, value: reply })

  if (re.data.success) {
    init();
  }

  return re.data.success;
};

const App = ({ commands }: { commands: Command }) => {
  return (
    <div className="commands">
      <h2 className="section-title">Commands</h2>
      <CommandList commands={commands} />
    </div>
  );
};
