import React from 'react'
import { Tabs } from 'antd';
import { RouteMap } from '../logic/routeLogic';
import {withRouter} from 'react-router-dom';

const { TabPane } = Tabs;

class TabMenu extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: '首页', content: 'index', key: 'index' },
            // { title: '测试1', content: 'route_test_1', key: 'route_test_1' },
            // { title: '测试2', content: 'route_test_2', key: 'route_test_2' },
            // { title: '测试3', content: 'route_test_3', key: 'route_test_3' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    componentWillReceiveProps(){
        const currentRoute = this.props.history.location.pathname.substr(1);
        let route_path_array = [];
        this.state.panes.map(item=>{
            route_path_array = [...route_path_array,item.key]
        })
        if (route_path_array.indexOf(currentRoute) === -1){
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
        this.setState({ panes });
    };

    remove = targetKey => {
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
        this.setState({ panes, activeKey });
    };

    onTabClick = (evt)=>{
        if(evt != this.props.match.params.name){
            this.props.history.push(`/${evt}`)
        }
    }
    render(){
        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    onTabClick={this.onTabClick}
                >
                    {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key}>
                        {(new RouteMap[pane.content].component) }
                        </TabPane>
                    ))}
                </Tabs>
            </div>

        )
    }
}

export default  withRouter(TabMenu);