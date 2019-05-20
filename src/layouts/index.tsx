import React from 'react';
import styles from './index.css';
import { Layout, Menu, Icon } from 'antd';
import routesConfig from '@/pages/routes'
import { Link } from 'react-router-dom'
// import withRouter from 'umi/withRouter';
import { connect } from 'dva';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
interface BasicLayoutProps {
  users: {
    total: number
  },
  g: {
    collapsed: boolean
  },
  dispatch: any,
  location: any,
}
interface BasicLayoutState {
  collapsed: boolean,
  routesConfig: any[],
  defaultOpenKeys: string[], // subMenu 默认选择key
  defaultSelectedKeys: string[], // menuItem 默认选择key
}

// @withRouter()
@connect((props: any, state: any): any => Object.assign({}, props, state))
export default class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      collapsed: false,
      routesConfig: routesConfig.routes,
      defaultOpenKeys: ['/recommendManage', '/recommendManage/lvxingshe'],
      defaultSelectedKeys: ['/recommendManage/lvxingshe/setting'],
    };
    this.toggle = this.toggle.bind(this)
    this.fnMenuList = this.fnMenuList.bind(this) 
  }

  fnChangeCollapsed(collapsed: boolean): void {
    this.props.dispatch({
      type: 'g/sync_changeCollapsed',
      payload: collapsed
    })
  }

  toggle(): void {
    console.log(this.props)
    this.fnChangeCollapsed(!this.props.g.collapsed)
    // this.setState((state) => {
    //   return {
    //     collapsed: !state.collapsed,
    //   }
    // });
  }

  componentDidMount(): void {
    // console.log()
  }

  fnMenuList(): JSX.Element {
    let arr: JSX.Element[] = this.state.routesConfig.map(item => {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {
              item.routes.map((item2: any): JSX.Element => {
                if (item2.routes) {
                  return (
                    <SubMenu
                      key={item2.path}
                      title={<span><Icon type={item2.icon} /><span>{item2.name}</span></span>}
                    >
                      {
                        item2.routes.map((item3: any): JSX.Element => {
                          return (
                            <Menu.Item key={item3.path}>
                              <Link to={item3.path}>
                                <Icon type={item3.icon} />
                                <span>{item3.name}</span>
                              </Link>
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item key={item2.path}>
                    <Link to={item2.path}>
                      <Icon type={item2.icon} />
                      <span>{item2.name}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={this.state.defaultOpenKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}>
        {arr}
      </Menu>
    )
  }

  componentWillMount() {
    let pathname: string = this.props.location.pathname
    let pathSnippets: string[] = pathname.split('/').filter(item => item)
    let defaultOpenKeys: string[] = [`/${pathSnippets[0]}`, `/${pathSnippets[0]}/${pathSnippets[1]}`]
    this.setState((state: BasicLayoutState, props: BasicLayoutProps) => {
      return {
        defaultOpenKeys: defaultOpenKeys,
        defaultSelectedKeys: [`${pathname}`]
      }
    })

    /*
    ["recommendManage", "lvxingshe", "list"]
    ["recommendManage", "lvxingshe", "list", "detail"]
    */
  }

  render() {
    if (this.props.location.pathname === '/login') {
      return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>{ this.props.children }</div>
    }
    return (
      <div className={styles.normal}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            style={{ "minHeight": "100vh" }}
            collapsed={this.props.g.collapsed}
          >
            <div className="logo" />
            {
              this.fnMenuList()
            }
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.props.g.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};

// export default withRouter(connect((props: any, state: any): any => Object.assign({}, props, state))());
