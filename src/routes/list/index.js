import { Component } from 'react';

import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';


const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '品类',
    dataIndex: 'category',
    key: 'category',
  },  
  {
    title: '入库时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '上次修改',
    dataIndex: 'last_time',
    key: 'last_time',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>查看</a>
        <Divider type="vertical" />
        <a>编辑</a>
        <Divider type="vertical" />
        <a>上线</a>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    title: 'John Brown',
    city: '北京',
    category: 'xxx',
    create_time: '2019-12-20 20:22:21',
    last_time: '2019-12-20 21:22:21',
    status: '已上线',
  },
];

class Page extends Component {
  render() {
    return <Table columns={columns} dataSource={data} />
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(Page);
