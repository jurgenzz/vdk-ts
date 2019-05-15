import * as React from 'react';
import { Command } from './index';
import { Editor } from './Editor';

const { useState } = React;

export const CommandList = ({ commands }: { commands: Command }) => {
  const [commandsVisible, setVisible] = useState(true);

  return (
    <div className="commands-wrap">
      <div className="add-command-wrap">
        <button className="add-command-btn" onClick={() => setVisible(!commandsVisible)}>
          Add command
        </button>
      </div>
      {commandsVisible ? (
        <div className="commands-list">
          {Object.keys(commands).map(command => (
            <div key={command} className="command-item">
              <div className="title">{command}</div>
              <div className="body">{commands[command]}</div>
            </div>
          ))}
        </div>
      ) : (
        <Editor />
      )}
    </div>
  );
};
