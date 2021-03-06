import React from 'react'
import { Tabs, Button, Icon, Menu, Dropdown } from 'antd';
import { RouteMap } from '../logic/routeLogic';
import { withRouter } from 'react-router-dom';
import RouterContext from "../context/routerContext";
const { TabPane } = Tabs;

class TabMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: this.props.history.location.pathname.substr(1),
            panes: [
                { title: '首页', content: 'index', key: 'index', closable: false }
            ],
            contentList: []
        };
    }

    refreshRoute = (currentRoute) => {
        if (currentRoute !== 'index') {
            this.add(currentRoute);
        }
    }
    componentDidMount() {
        const currentRoute = this.props.history.location.pathname.substr(1);
        this.refreshRoute(currentRoute);
    }

    componentWillReceiveProps() {
        const activeKey = this.props.history.location.pathname.substr(1);
        const route_path_array = this.state.panes.map(item => item.key)
        if (!route_path_array.includes(activeKey)) {
            this.add(activeKey);
        }
        this.setState({ activeKey })
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = (currentRoute) => {
        const panes = Array.from(this.state.panes);
        const title = RouteMap[currentRoute].name;
        panes.push({ title: title, content: currentRoute, key: currentRoute });
        this.setState({ panes: panes })
    };

    remove = (targetKey, history) => {
        let { activeKey } = this.state;
        const panes = Array.from(this.state.panes)
        const currentIndex = panes.findIndex((item => item.key === targetKey))
        let lastIndex = panes.findIndex(pane => pane.key === targetKey) - 1
        const currentPanes = panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = currentPanes[lastIndex].key;
            } else {
                activeKey = currentPanes[0].key;
            }
        }
        lastIndex = currentIndex === panes.length - 1 ? currentIndex - 1 : currentIndex + 1
        const history_route = panes[lastIndex].key
        this.setState({ panes: currentPanes, activeKey }, () => {
            //活动最近的路由
            this.props.history.push(history || history_route);
        });
    };

    onTabClick = (evt) => {
        if (evt !== this.props.match.params.name) {
            this.props.history.push(`/${evt}`)
        }
    }

    renderList = () => {
        let panes = Array.from(this.state.panes)
        return panes.map(pane => {
            const Content = RouteMap[pane.content].component
            return <TabPane tab={pane.title} key={pane.key} closable={pane.closable === false ? false : true}>
                <Content />
            </TabPane>
        })
    }
    operations = () => (<Dropdown overlay={this.menu()} trigger={['click']} placement="bottomLeft">
        <Button><Icon type="align-right" /></Button>
    </Dropdown>)

    menu = () => (
        <Menu>
            <Menu.Item key="0" onClick={this.closeOther} disabled={this.state.panes.length === 2 && this.state.panes.some(item => item.key === 'index')}>
                关闭其他
        </Menu.Item>
            <Menu.Item key="1" onClick={this.closeAll}>
                关闭全部
        </Menu.Item>
        </Menu>
    );
    closeAll = () => {
        let panes = Array.from(this.state.panes)
        panes = panes.filter(item => item.key === 'index')
        this.setState({ panes }, () => {
            this.props.history.push('index')
        })
    }
    closeOther = () => {
        const currentRoute = this.props.history.location.pathname.substr(1);
        let panes = Array.from(this.state.panes)
        panes = panes.filter(item => item.key === 'index' || item.key === currentRoute)
        this.setState({ panes })
    }
    render() {
        const { panes, activeKey } = this.state
        return (
            <RouterContext.Provider
                value={
                    {
                        remove: (currentRoute, history) => {
                            this.remove(currentRoute, history)
                        },
                        tabs: panes
                    }}
            >
                <div>

                    <Tabs
                        tabBarExtraContent={panes.length === 1 && panes.some(item => item.key === 'index') ? null : this.operations()}
                        hideAdd
                        onChange={this.onChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                        onTabClick={this.onTabClick}
                    >
                        {this.renderList()}
                    </Tabs>
                </div>
            </RouterContext.Provider >
        )
    }
}
export default withRouter(TabMenu)