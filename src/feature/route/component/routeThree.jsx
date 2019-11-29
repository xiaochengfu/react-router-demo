import React from 'react'
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import TabRouter from '../../../common/layout/tabRouter';
class RouteThree extends React.Component {
    state = {
        remove: () => { }
    }
  
    goto = () => {
        this.props.history.push('route_test_1')
    }
    close = () => {
        const currentRoute = this.props.history.location.pathname.substr(1);
        this.props.remove(currentRoute)
    }
    closeAndGoto = () => {
        const currentRoute = this.props.history.location.pathname.substr(1);
        this.props.remove(currentRoute, 'route_test_1')
        // this.props.history.push('route_test_1');
    }

    render() {
        return (
            <div >
                <div>测试3</div>
                <Button onClick={this.goto}>跳转到测试1</Button>
                <Button
                    onClick={this.close}>关闭当前</Button>
                <Button onClick={this.closeAndGoto}>关闭当前并跳转到测试1</Button>
            </div>
        )
    }
}

export default withRouter(TabRouter(RouteThree))