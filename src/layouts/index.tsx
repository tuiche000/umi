import React from 'react';
import styles from './index.css';
import { Layout, Menu, Icon } from 'antd';
import routesConfig from '@/pages/routes'
import { Link } from 'react-router-dom'
import { connect } from 'dva';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
interface BasicLayoutProps {
  users: {
    total: number
  }
}
interface BasicLayoutState {
  collapsed: boolean,
  routesConfig: any[],
}
class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      collapsed: false,
      routesConfig: routesConfig.routes
    };
    this.toggle = this.toggle.bind(this)
    this.fnMenuList = this.fnMenuList.bind(this)
  }

  toggle(): void {
    this.setState((state) => {
      return {
        collapsed: !state.collapsed,
      }
    });
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
    console.log(this.props)
    return (
      <div className={styles.normal}>
        <Layout style={{ "height": "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
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
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            > 
            {this.props.users.total}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};

export default connect((props: any, state: any): any => Object.assign({}, props, state))(BasicLayout);
