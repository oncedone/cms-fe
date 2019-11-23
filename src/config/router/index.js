const routerConfig = [
  {
    name: 'home',
    path: '/home',
    title: '首页',
    componentKey: 'home',
    selectedMenuKey: 'home_',
    default: true
  },
  {
    name: 'list',
    path: '/list',
    title: '列表页',
    componentKey: 'list',
    selectedMenuKey: 'list_'
  },
  {
    name: 'edit',
    path: '/edit',
    title: '编辑',
    componentKey: 'edit',
    selectedMenuKey: 'edit_',
  },
];

export default routerConfig;