import React from 'react'
import '../../../src/index.css';
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon
} from 'antd';
import { withRouter } from "react-router-dom";
import TabMenu from './tabMenu';
const {
    SubMenu
} = Menu;
const {
    Header,
    Content,
    Sider
} = Layout;

class LayoutMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftMenuList: [
                {
                    name: '路由',
                    path: 'route',
                    children: [
                        {
                            name: '测试1',
                            path: 'route_test_1'
                        },
                        {
                            name: '测试2',
                            path: 'route_test_2'
                        },
                        {
                            name: '测试3',
                            path: 'route_test_3'
                        }

                    ]
                }
            ],
            currentRoute: 'index'
        }
    }

    // componentWillMount(){
    // }
    UNSAFE_componentWillMount() {

    }

    clickMenu = (evt) => {
        this.props.history.push(`/${evt.key}`)
    }

    render() {
        let selectedKey = this.props.match.params.name;
        return (
            <div>
                <Layout
                    style={{ height: '100%' }}
                >
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[]}
                                defaultOpenKeys={['route']}
                                selectedKeys={[selectedKey]}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {this.state.leftMenuList.map(item => {
                                    return <SubMenu
                                        key={item.path}
                                        mode="inline"
                                        inlineCollapsed={true}
                                        title={
                                            <span>
                                                <Icon type="user" />
                                                {item.name}
                                            </span>
                                        }
                                    >
                                        {item.children && item.children.map((item) => {
                                            return <Menu.Item
                                                onClick={this.clickMenu}
                                                key={item.path}
                                            >{item.name}</Menu.Item>
                                        })}
                                    </SubMenu>
                                })}
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <TabMenu />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>

        )
    }
}
export default withRouter(LayoutMenu);