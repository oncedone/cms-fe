import { Component } from 'react';
import AceEditor from 'react-ace';
import _ from 'lodash';
import 'brace/mode/json';
import 'brace/theme/monokai';

export default class CodeEditor extends Component {
  render() {
    const { name = _.uniqueId(), onChange = () => {}, value = {} } = this.props;
    return (
      <div>
        <AceEditor
          mode="json"
          theme="monokai"
          value={value}
          tabSize={2}
          onChange={onChange}
          name={name}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    )
  }
}