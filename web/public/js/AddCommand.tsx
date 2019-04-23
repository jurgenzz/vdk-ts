import * as React from 'react';
const { useState } = React;

export const AddCommand = ({ onAdd }: { onAdd: (command: string, reply: string) => void }) => {
  const [command, setCommand] = useState('!');
  const [reply, setReply] = useState('');

  const validateCommand = (cmd: string) => {
    cmd = '!' + cmd.replace(/\W/g, '');
    setCommand(cmd);
  };

  return (
    <div className="add-command-wrap">
      <label htmlFor="command">Command</label>
      <input id="command" value={command} onChange={e => validateCommand(e.target.value)} />
      <label htmlFor="reply">Reply</label>
      <input value={reply} onChange={e => setReply(e.target.value)} id="reply" />
      <button onClick={() => onAdd(command, reply)}>Add command</button>
    </div>
  );
};
