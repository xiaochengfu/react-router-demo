import React from 'react'
import { Tabs } from 'antd';
import { RouteMap } from '../logic/routeLogic';
import { withRouter } from 'react-router-dom';
import RouterContext from "../context/routerContext";
const { TabPane } = Tabs;
class TabMenu extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: '首页', content: 'index', key: 'index', closable: false }
        ];
        const currentRoute = this.props.history.location.pathname.substr(1);

        this.state = {
            activeKey: currentRoute,
            panes,
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
        const currentRoute = this.props.history.location.pathname.substr(1);
        let route_path_array = [];
        this.state.panes.forEach(item => {
            route_path_array = [...route_path_array, item.key]
        })
        if (route_path_array.indexOf(currentRoute) === -1) {
            this.add(currentRoute);
        }
        this.setState({
            activeKey: currentRoute
        })
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {

        this[action](targetKey);
    };

    add = (currentRoute) => {
        const { panes } = this.state;
        const title = RouteMap[currentRoute].name;
        panes.push({ title: title, content: currentRoute, key: currentRoute });
        this.setState({})
    };

    remove = (targetKey, history) => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                if (i === this.state.panes.length - 1) {
                    lastIndex = i - 1;
                } else {
                    lastIndex = i + 1
                }
            }
        });
        const history_route = this.state.panes[lastIndex].key;
        //实现浏览器关闭标签时的跳转功能
        this.setState({ panes, activeKey }, () => {
            this.props.history.push(history || history_route);
        });

    };



    onTabClick = (evt) => {
        if (evt !== this.props.match.params.name) {
            this.props.history.push(`/${evt}`)
        }
    }
    renderList = () => {
        let List = []

        this.state.panes.forEach(pane => {
            const Content = RouteMap[pane.content].component
            List.push(<TabPane tab={pane.title} key={pane.key} closable={pane.closable === false ? false : true}>
                <Content />
            </TabPane>)
        })
        return List
    }
    render() {
        return (
            <RouterContext.Provider
                value={{
                    remove: (currentRoute, history) => {
                        this.remove(currentRoute, history)
                    }
                }}
            >
                <div>

                    <Tabs
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                        onTabClick={this.onTabClick}
                    >
                        {this.renderList()}
                    </Tabs>
                </div>
            </RouterContext.Provider>
        )
    }
}
export default withRouter(TabMenu)