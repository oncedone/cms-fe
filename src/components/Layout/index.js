import { Component, Children } from "react";
import { connect } from "dva";
import { Breadcrumb, Modal, Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "dva/router";
import routerConfig from "../../config/router";
// import { hasPerm } from '../WrapAuth';
import { logout } from "../../services/app";
const { Header, Sider, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const {
  globalConfig: { menus = [], sysName = "", userInfo = {} } = {}
} = window;

class XLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedMenuKey: "",
      logoutModal: false
    };
    this.openMenuKeys = this.getOpenMenuKeys();
    this.routerConfigMapCache = null;
  }

  getInitData() {
    this.props.dispatch({
      type: "app/getChoices"
    });
  }

  componentDidMount() {
    // this.getInitData();
    this.setState({
      //   selectedMenuKey: this.getSelectedMenuKey()
    });
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  getSelectedMenuKey() {
    const {
      location: { pathname = "" }
    } = this.props;
    if (pathname === "/") return "";
    if (!this.routerConfigMapCache) {
      this.configCache();
    }
    const selectedMenuKey = (this.routerConfigMapCache[pathname] || {})
      .selectedMenuKey;
    return selectedMenuKey;
  }

  getOpenMenuKeys() {
    const keys = [];
    menus.forEach(menu => {
      if (menu.sub_items && menu.sub_items.length > 0) {
        keys.push(menu.name);
      }
    });
    return keys;
  }

  configCache() {
    this.routerConfigMapCache = {};
    routerConfig.forEach(item => {
      this.routerConfigMapCache[item.path] = item;
    });
  }

  getBreadcrumb() {
    const {
      location: { pathname = "" }
    } = this.props;
    if (!this.routerConfigMapCache) {
      this.configCache();
    }
    const breadcrumb = [];
    const currentRoute = this.routerConfigMapCache[pathname] || {};
    const loop = obj => {
      if (!obj) return;
      breadcrumb.unshift({
        path: obj.path,
        breadcrumbName: obj.title
      });
      if (obj.breadcrumb) {
        loop(this.routerConfigMapCache[obj.breadcrumb]);
      }
    };
    loop(currentRoute);
    return breadcrumb;
  }

  // itemRender(route, params, routes, paths) {
  //   const last = routes.indexOf(route) === routes.length - 1;
  //   return last ? <span className={styles.breadcrumbName}>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
  // }

  // renderMenu(data) {
  //   const { sub_items } = data;
  //   this.getBreadcrumb()
  //   if(!sub_items) {
  //     return <MenuItem key={data.name}>
  //       <Link to={`/${data.name}`}>
  //         <span className='menu-icon'>
  //           <i className="iconfont" dangerouslySetInnerHTML={{__html: data.icon || '&#xe604;'}}></i>
  //         </span>
  //         <span className='menu-text'>{data.title}</span>
  //       </Link>
  //     </MenuItem>
  //   }else {
  //     return <SubMenu key={data.name} title={<span className='menu-icon'><i className="iconfont" dangerouslySetInnerHTML={{__html: data.icon || '&#xe6c2;'}}></i><span className='menu-text'>{data.title}</span></span>}>
  //     {
  //       sub_items.filter(o => hasPerm([o.code || ''])).map(menu => <MenuItem key={menu.name}>
  //         <Link to={`/${data.name}/${menu.name}`}><span className='menu-text'>{menu.title}</span></Link>
  //       </MenuItem>)
  //     }
  //     </SubMenu>
  //   }
  // }

  async logout() {
    this.setState({
      logoutModal: false
    });
    const resp = await logout();
    if (resp.code === "0") {
      window.location.href = "/";
    }
  }

  render() {
    const { collapsed, selectedMenuKey, logoutModal } = this.state;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1", "2", "3"]}
          >
            <Menu.Item key="1">
              <Link to={`/`}>
                <Icon type="user" />
                <span className="menu-text">home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/list`}>
                <Icon type="upload" />
                <span className="menu-text">list</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/edit`}>
                <Icon type="video-camera" />
                <span className="menu-text">edit</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            /> */}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {Children.map(this.props.children, child => child)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    app
  };
};

export default withRouter(connect(mapStateToProps)(XLayout));
