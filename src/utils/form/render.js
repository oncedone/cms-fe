import { Input, Select, Radio, DatePicker, Form, Button } from 'antd';
import { Fragment } from 'react';
import CopyText from '../../components/CopyText';
import CodeEditor from '../../components/CodeEditor';
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default function(config = [], props) {
  const renderTypeMap = {
    'input': (record) => {
      return <Input style={{width: record.width || '100%'}}/>
    },
    'input-copy': (record) => {
      const value = (props[record.key] || {}).value;
      return <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '40px'}}>
      <Input value={value} disabled style={{width: record.width || 'calc(100% - 100px)'}}/>
      <CopyText title="" data={value}><Button type="primary">复制</Button></CopyText>
      </div>
    },
    'textarea': (record) => {
      return <TextArea placeholder={record.placeholder || ''} autosize style={{minHeight: `${record.height || 0}px`}} />
    },
    'select': (record) => {
      return <Select style={{ width: record.width || '100%' }} onChange={() => {}}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    },
    'radio': (record) => {
      return <RadioGroup onChange={() => {}}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </RadioGroup>
    },
    'tag': (record) => {
      return <Select mode="tags" filterOption={false} dropdownStyle={{display: 'none'}} placeholder="" style={{ width: record.width || '100%' }}/>
    },
    'datePicker': (record) => {
      return <DatePicker 
        format= "YYYY-MM-DD HH:mm:ss"
        onChange={() => {}}
       />
    },
    'jsonEditor': (record) => {
      const value = (props[record.key] || {}).value;
      return <CodeEditor
        setFieldsValue={value}
      />
    }
  }
  const { form } = props;
  const { getFieldDecorator } = form;
  return <Fragment>
  {
    config.map((item, k) => {
      if(item.renderType) {
        const renderFunc = renderTypeMap[item.renderType] || function() { return null };
        const rules = [];
        if(item.required) {
          rules.push({
            required: true,
            message: '字段必填',
          })
        }
        return <Form.Item 
          key={k}
          help={item.help || ''}
          label={item.label || ''}
          required={item.required}
        >
          <div>
          {
            getFieldDecorator(item.key, {
              validateTrigger: 'onBlur',
              rules,
            })(renderFunc(item))
          }
          </div>
        </Form.Item>
      }else {
        return null;
      }
    })
  }
  </Fragment>

}
