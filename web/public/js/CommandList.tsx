import * as React from 'react';
import { Command } from './index';
export const CommandList = ({ commands }: { commands: Command }) => (
  <>
    {Object.keys(commands).map(command => (
      <div key={command}>
        {command}: {commands[command]}
      </div>
    ))}
  </>
);
