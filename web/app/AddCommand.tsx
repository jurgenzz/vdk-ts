import * as React from 'react';
const { useState } = React;

export const AddCommand = ({ onAdd }: { onAdd: (command: string, reply: string) => Promise<boolean> }) => {
  const [command, setCommand] = useState('!');
  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({command: null, reply: null})

  const saveCommand = async (command:string, reply:string) => {
      //@ts-ignore
      errors.command = command.length > 1 ? null : 'Please enter a valid command';
      //@ts-ignore
      
      
      let canSubmit = Object.values(errors).every(c => !c);

      if (canSubmit) {
        let success = await onAdd(command, reply);
        if (success) {
          setVisible(false);
        } else {
          //@ts-ignore
          errors.command ='Command exists';
        }
      }
      
      setErrors({...errors});
      

  }

  const validateCommand = (cmd: string) => {
    cmd = '!' + cmd.replace(/\W/g, '');
    setCommand(cmd);
  };

  return (
    <div className="add-command-wrap">
    <button className="add-command-btn" onClick={() => setVisible(!visible)}>Add command</button>
      {visible ? (
        <div className="command-popup">
          <label htmlFor="command">Command</label>
          <input id="command" value={command} onChange={e => validateCommand(e.target.value)} />
          {errors.command && <span className="input-error">{errors.command}</span>}
          
          <label htmlFor="reply">Reply</label>
          <input value={reply} onChange={e => setReply(e.target.value)} id="reply" />
          {errors.reply && <span className="input-error">{errors.reply}</span>}

          <div className="btn-wrap">
            <button onClick={() => setVisible(!visible)}>Cancel</button>
            <button className="add" onClick={() => saveCommand(command, reply)}>Save</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
