import { Component } from 'react';
import { Table, Divider, } from 'antd';
import { connect } from 'dva';

import Filter from '../../components/Filter';
import './index.less';

import { getList } from '@/services/app';

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

const fieldList = [
    {
        field: 1,
        formField: 'name',
        type: 'selectSingle',
        label: '名字',
        elementOption: {
            placeholder: '输入班课名称搜索',
            style: { width: 200 },
        },
        options: [{ value: 1, text: 'xxx' }],
    },
    {
        field: 1,
        formField: 'city',
        type: 'selectSingle',
        label: '名字',
        options: [{ value: 1, text: 'xxx' }],
        elementOption: {
            placeholder: '输入班课名称搜索',
            style: { width: 200 },
        },
    },
    {
        field: 1,
        formField: 'category',
        type: 'inputText',
        label: '名字',
        options: [{ value: 1, text: 'xxx' }],
    },
];

class Page extends Component {
    state = {
        queryParams: {}
    };

    componentDidMount() {
        // this.search(0);
    }

    async search(pageIndex) {
        const { period, name, task_name } = this.state.queryParams;
        const req = {
            name,
            task_name,
            limit: 15,
            offset: pageIndex * 15,
        };
        if (period && period.length && period[0] && period[1]) {
            req.start_time = ~~(period[0] / 1000);
            req.end_time = ~~(period[1] / 1000);
        }
        const res = await getList(req);
        if (!res.err_no) {
            this.setState({
                taskList: res.data.tasks,
                total: res.data.total_count,
            });
        }
    }
    handleSearch(v) {
        console.log(v);
    }
    handleReset(v) {}
    handleSearchChange() {}

    handleFilterChange = values => {
        // if (values.period) {
        //     values.period = [
        //         +moment(+values.period[0]).startOf('day'),
        //         +moment(+values.period[1]).endOf('day')
        //     ];
        // }
        this.setState({ queryParams: values });
    };

    handleReset = () => {
        this.setState({
            queryParams: {
                name: '',
                task_name: '',
                period: [],
            },
        });
    };

    handleSearch = () => {
        this.search(0);
        this.setState({ currPage: 1 });
    };

    handleFlipPage = current => {
        this.search(current - 1);
        this.setState({ currPage: current });
    };

    render() {
        const { taskList, total, currPage } = this.state;
        const dataSource = data;
        return (
            <div className="list-page">
                <div className="filter-wrapper">
                    <Filter
                        fieldList={fieldList}
                        onSearch={this.handleSearch}
                        onReset={this.handleReset}
                        onSearchChange={this.handleSearchChange}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    locale={{ emptyText: '暂无数据' }}
                    pagination={{
                        total,
                        current: currPage,
                        showTotal: total => `共${total}条数据`,
                        pageSize: 15,
                        showQuickJumper: true,
                        onChange: this.handleFlipPage,
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ app }) => {
    return { app };
};

export default connect(mapStateToProps)(Page);
