/**
 * 筛选列表
 */
import React from 'react';
import Props from 'prop-types';
import {
    Select,
    Button,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Radio,
} from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { get, set, find, has } from 'lodash';

const Option = Select.Option;
const FormItem = Form.Item;

/**
 * 目前整合 antd 组件支持的类型
 * @selectSingle Select单选
 * @selectMultiple Select多选
 * @inputText Input
 * @inputNumber InputNumber
 * @selectDateRange DatePicker.RangePicker
 */
// export type FieldType = 'selectSingle' | 'selectMultiple' | 'inputText' | 'inputNumber' |
//     'selectDateRange' | 'radioGroup';

// 单个筛选组件配置
// interface FieldOption {
//     field: string;
//     formField?: string; // 在 form 中设置时的字段名
//     type?: FieldType; // 组件类型，目前支持如上四种
//     label?: string; // 表单项前的描述，传了则展示
//     options?: SelectOption[]; // Select 选项列表
//     elementOption?: any; // 传给 antd 组件的配置（如 mode、labelInValue），若 field 为 teacher，则 elementOption.type 属性传给 TeacherSearcher
//     render?: (arg: RenderArgs) => any; // 自定义渲染方法，指定后不判断组件类型，直接调用该方法渲染
//     filterBy?: string[]; // 根据当前 FilterList 中选中的字段过滤选项值
// }

// interface RenderArgs {
//     setFieldsValue: (any) => any; // 设置 form 字段值方法
//     [key: string]: any; // FieldOption 参数展开
// }

// interface SelectOption {
//     value: string | number;
//     text: string | number;
// }

// tslint:disable-next-line: prefer-array-literal
// export type FieldList = Array<string | FieldOption | ReactElement>;

// interface Props {
//     onSearch: (filterItems: any) => any; // 从父组件传入的查询方法，会将当前的查询参数传过去
//     fieldList: FieldList; // 当前需要使用的查询字段列表
//     onSearchChange?: (filterItem: any) => any; // 当前组件修改查询参数时触发，将修改的参数传入
//     onReset?: () => any; // 点击重置
//     showReset?: boolean;
//     [key: string]: any;
// }

class FilterList extends React.Component {
    static props = {
        onSearch: Props.func,
        fieldList: Props.array,
        onSearchChange: Props.func,
        onReset: Props.func,
        showReset: Props.bool,
    }

    componentDidMount() {
        const { fieldList } = this.props;
        // 初始化过滤字段
        this.initFilters(fieldList);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSearch(values);
            }
        });
    };

    handleReset = () => {
        const { onReset, form } = this.props;
        form.resetFields();
        onReset && onReset();
    };

    getOptions = fieldManagerName => {
        const fieldMap = this.context.getField(fieldManagerName);
        return Object.keys(fieldMap).map(key => ({
            value: key,
            text: fieldMap[key],
        }));
    };

    // 获取表单字段值，优先使用 formField 字段
    getFormFieldName = ({ formField, field }) => formField || field;

    initFilters = fieldList => {
        // 遍历每个配置项，找到 filterBy 属性，并将 filterBy 属性配置的字段添加到 this.filters
        this.filters = fieldList.reduce((filtersObj, fieldOption) => {
            // 找到存在 filterBy 配置的配置项
            const filterBy = get(fieldOption, 'filterBy');
            if (!filterBy) return filtersObj;
            if (!Array.isArray(filterBy))
                throw new Error('FilterList 配置错误: filterBy 属性必须是数组');
            if (typeof fieldOption === 'object' && filterBy) {
                // 遍历 filterBy 配置的字段，找到当前配置列表中对应的配置，优先使用 formField 配置 this.filters 的字段名
                filterBy.forEach(fieldName => {
                    // 找到要用来过滤的字段，添加到 this.filters 属性中
                    const filterField = find(
                        fieldList,
                        field =>
                            field === fieldName ||
                            get(field, 'field') === fieldName
                    );
                    // 优先使用配置中的 formField 配置过滤项字段名，否则使用默认 field 名
                    set(
                        filtersObj,
                        get(filterField, 'formField', fieldName),
                        undefined
                    );
                });
            }
            return filtersObj;
        }, {});
    };

    renderFieldItems = fieldList => {
        const { getFieldDecorator } = this.props.form;
        return fieldList.map((field, index) => {
            const isStr = typeof field === 'string';
            const fieldName = isStr ? field : get(field, 'field');
            // 若发现配置项是个 <br /> 元素，则直接渲染
            if (!fieldName && get(field, 'type') === 'br') return field;
            // 若存在默认配置，则覆盖，否则直接使用
            const fieldOption = field;
            const { elementOption } = fieldOption;

            return (
                <FormItem
                    key={`filter-list-${index}`}
                    label={fieldOption.label || false}
                >
                    {// 设置字段时，优先使用 formField 配置，从而实现复用已有的筛选项，但 form 中字段名自定义，例如 field 为 subject 但设置时字段为 subject_1
                    getFieldDecorator(this.getFormFieldName(fieldOption), {
                        initialValue: get(elementOption, 'defaultValue'),
                        // 若 elementOption 配置中传入了 onChange，则需要同时调用内部的 onChange 及外部的 onChange，对用户无感
                        onChange: (...args) => {
                            const formFieldName = this.getFormFieldName(
                                fieldOption
                            );
                            const value = args[0];
                            const onChange = get(elementOption, 'onChange');
                            // 若在 this.filters 中存在该字段，则 onChange 时需要更新 this.filters
                            if (has(this.filters, formFieldName)) {
                                this.filters[formFieldName] = value;
                            }
                            if (typeof onChange === 'function')
                                onChange(...args);
                        },
                    })(this.renderFormItem(fieldOption))}
                </FormItem>
            );
        });
    };

    renderFormItem = option => {
        const {
            field,
            type,
            render,
            elementOption = {},
            options = [],
        } = option;
        const { setFieldsValue, getFieldValue } = this.props.form;
        // 若传了自定义 render 方法，则直接调用
        if (typeof render === 'function') {
            return render({ setFieldsValue, getFieldValue, ...option });
        }
        // 删除 defaultValue 属性，否则会出 warning
        // 勿删注释！！！！！！！！！！
        // delete elementOption.defaultValue;

        if (type === 'selectSingle' || type === 'selectMultiple') {
            return (
                <Select
                    mode={type === 'selectMultiple' ? 'multiple' : ''}
                    filterOption={false}
                    allowClear={true}
                    dropdownMatchSelectWidth={false}
                    {...elementOption}
                >
                    {options.map(({ value, text }) => (
                        <Option key={`${field}-${value}`} value={value}>
                            {text}
                        </Option>
                    ))}
                </Select>
            );
        }
        if (type === 'selectDateRange') {
            return <DatePicker.RangePicker {...elementOption} />;
        }
        if (type === 'inputNumber') {
            return <InputNumber {...elementOption} />;
        }
        if (type === 'radioGroup') {
            return (
                <Radio.Group {...elementOption}>
                    {options.map(({ value, text }) => (
                        <Radio.Button key={`${field}-${value}`} value={value}>
                            {text}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            );
        }
        return <Input {...elementOption} />;
    };

    render() {
        const {
            fieldList = [],
            showReset = true,
            showSearch = true,
        } = this.props;

        return (
            <div className="filter-list">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {this.renderFieldItems(fieldList)}
                    {showSearch && (
                        <FormItem className="submit">
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </FormItem>
                    )}
                    {showReset && (
                        <FormItem className="reset">
                            <Button onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    )}
                </Form>
            </div>
        );
    }
}

export default Form.create({
    onValuesChange(props, changedValues, allValues) {
        const { onSearchChange } = props;
        onSearchChange && onSearchChange(allValues);
    },
})(FilterList);
