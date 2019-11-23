export default [
    {
      key: 'workflow_id',
      label: '模板ID',
      renderType: 'input',
      valueType: 'string',
      required: true
    },
    {
      key: 'workflow_name',
      label: '模板名字',
      renderType: 'input',
      valueType: 'string',
      required: true
    },
    {
      key: 'content',
      label: '模板配置',
      renderType: 'jsonEditor',
      valueType: 'jsonString',
      required: true
    },
    {
      key: 'default_params',
      label: '模板参数',
      renderType: 'jsonEditor',
      valueType: 'jsonString',
      required: true
    },
    {
      key: 'version',
      label: '版本',
      renderType: 'input',
      valueType: 'string',
      required: true
    },
    {
      key: 'status',
      label: '状态',
      renderType: 'input',
      valueType: 'string',
      required: true
    }
  ]