import React from 'react';
import styles from './index.css';
import { Layout, Menu, Icon } from 'antd';
import routesConfig from '@/pages/routes'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
// import withRouter from 'umi/withRouter';
=======
import withRouter from 'umi/withRouter';
>>>>>>> wk
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
<<<<<<< HEAD
  location: any,
=======
>>>>>>> wk
}
interface BasicLayoutState {
  collapsed: boolean,
  routesConfig: any[],
}
<<<<<<< HEAD

// @withRouter()
@connect((props: any, state: any): any => Object.assign({}, props, state))
export default class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
=======
class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
>>>>>>> wk
  constructor(props: any) {
    super(props)
    this.state = {
      collapsed: false,
      routesConfig: routesConfig.routes
    };
    this.toggle = this.toggle.bind(this)
<<<<<<< HEAD
    this.fnMenuList = this.fnMenuList.bind(this) 
=======
    this.fnMenuList = this.fnMenuList.bind(this)
>>>>>>> wk
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
<<<<<<< HEAD
    // console.log()
=======
    // console.log(this.props.dispatch)
>>>>>>> wk
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {arr}
      </Menu>
    )
  }

  render() {
<<<<<<< HEAD
    if (this.props.location.pathname === '/login') {
      return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>{ this.props.children }</div>
    }
=======
    console.log(this.props)
>>>>>>> wk
    return (
      <div className={styles.normal}>
        <Layout style={{ "height": "100vh" }}>
          <Sider
            trigger={null}
<<<<<<< HEAD
            collapsible
=======
            collapsible={true}
>>>>>>> wk
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
                className="trigger"
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

<<<<<<< HEAD
// export default withRouter(connect((props: any, state: any): any => Object.assign({}, props, state))());
=======
export default withRouter(connect((props: any, state: any): any => Object.assign({}, props, state))(BasicLayout));
>>>>>>> wk
