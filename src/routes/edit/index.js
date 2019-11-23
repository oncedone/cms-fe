import { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Icon, Select,
  Cascader, Button, DatePicker
} from 'antd';
import moment from 'moment';



// import AceEditor from 'react-ace';
// import CodeEditor from '../../components/CodeEditor';
import formRender from '../../utils/form/render';
import formConfig from '../../config/form/edit';

import axios from 'axios';

// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const city_options = [
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '2',
        label: '北京市',
        children: [
          {
            value: '3',
            label: '朝阳区'
          }
        ],
      },
    ],
  }
];

const category_options = [
  {
    value: '1',
    label: '本地服务',
    children: [
      {
        value: '1001',
        label: '公积金',
        children: [],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [],
      },
    ],
  },
];

class Page extends Component {

  handleCityChange = (value) => {

  }

  handleCategoryChange = (value) => {

  }

  handleContentChange = (val) => {
    console.log(val.toHTML());
  }

  handleContentSave = (val) => {
    console.log(val);
  }

  handleSubmit = () => {
    const { getFieldsValue } = this.props.form;
    const data = getFieldsValue();
    const _data =  {
      title: data.title,
      summary: data.summary,
      sourceId: data.source,
      // gmtPublished: moment(data.gmtPublished).format('yyyy-MM-dd HH:mm:ss.SSS'),
      gmtPublished: new Date(data.gmtPublished).getTime(),
      channelId: data.channel,
      categoryId: data.category,
      provinceId: data.area[0],
      cityId: data.area[1],
      districtId: data.area[2],
      content: data.content.toHTML(),
    };
    axios.post('/api/articles', _data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
          })(
            <Input
              // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入标题"
            />,
          )}
        </Form.Item>
        <Form.Item label="摘要">
          {getFieldDecorator('summary', {
            rules: [{ required: true, message: '请输入标题' }],
          })(
            <Input.TextArea
              placeholder="请输入摘要"
              minLength={4}
            />,
          )}
        </Form.Item>
        <Form.Item label="来源">
          {getFieldDecorator('source', {
            rules: [{ required: true, message: '请输入来源' }],
          })(
            <Input
              // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入来源"
            />,
          )}
        </Form.Item>
        <Form.Item label="发布时间">
          {getFieldDecorator('gmtPublished', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <DatePicker showTime placeholder="Select Time" />
          )}
        </Form.Item>
        <Form.Item label="城市">
          {getFieldDecorator('area', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
              <Cascader options={city_options} onChange={this.handleCityChange} changeOnSelect />
          )}
        </Form.Item>
        <Form.Item label="频道">
          {getFieldDecorator('channel', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Select>
              <Select.Option value={'1'}>本地服务</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="品类">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Select>
              <Select.Option value={'1001'}>公积金</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <BraftEditor
                // value={editorState}
                onChange={this.handleContentChange}
                onSave={this.handleContentSave}
            />
          )}
        </Form.Item>
        <Form.Item label=" ">
          <Button onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(Form.create()(Page));
