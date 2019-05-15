import * as React from 'react';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';
//@ts-ignore
import { github } from './themes/github';

let code = '';
let cmd = '';
const saveCommand = async (command: string, reply: string) => {
  let re = await axios.post('/api/saveCmd', { name: command, value: reply });

  if (re.data.success) {
    // init();
  }

  return re.data.success;
};

class Editor extends React.Component {
  onEditorMount = (_: any, monaco: any) => {
    monaco.editor.defineTheme('github', github);

    monaco.editor.setTheme('github');
  };
  render() {
    return (
      <div className="editor-wrap">
        <input placeholder="command" onChange={e => (cmd = e.target.value)} />
        <button className="add" onClick={() => saveCommand(cmd, code)}>
          Save
        </button>
        <div className="editor">
          <MonacoEditor
            width="100%"
            height="600"
            language="javascript"
            theme="github"
            value={`print(input)`}
            options={{
              minimap: {
                enabled: false
              }
            }}
            onChange={re => (code = re)}
            editorDidMount={this.onEditorMount}
            // options={options}
            // onChange={::this.onChange}
            // editorDidMount={::this.editorDidMount}
          />
        </div>
      </div>
    );
  }
}

export { Editor };
