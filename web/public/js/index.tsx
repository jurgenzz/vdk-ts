import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { AddCommand } from './AddCommand';
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
  await axios.post('/api/saveCmd', { name: command, value: reply });
  init();
};

const App = ({ commands }: { commands: Command }) => {
  return (
    <div>
      <h2>VDK commands</h2>
      <AddCommand onAdd={onAdd} />
      <CommandList commands={commands} />
    </div>
  );
};
