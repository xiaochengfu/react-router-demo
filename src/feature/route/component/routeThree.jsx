import React from 'react'
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import tabMenu from "./../../../common/layout/tabMenu";
import RemoveContext from "./../../../common/layout/removeContext";
class RouteThree extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        remove:()=>{}
    }
    goto=()=>{
        this.props.history.push('route_test_1')
    }
    close = ()=>{
        const currentRoute = this.props.history.location.pathname.substr(1);
        this.props.remove(currentRoute)
    }

    render(){
        return (
            <div >
            <div>测试3</div>
            <Button onClick={this.goto}>跳转到测试1</Button>
            <Button onClick={this.close}>关闭当前</Button>
            </div>
            
        )
    }
}
// let RouteThree1 = ()=>{
//     return <RemoveContext.Consumer>
//         {remove=>{
//             return <RouteThree remove={remove} />
//         }}
//     </RemoveContext.Consumer>
// }
// export default withRouter(RouteThree1)

// export default props => (
//     <RemoveContext.Consumer>
//         {remove => withRouter(<RouteThree {...props} remove={remove} />)}
//     </RemoveContext.Consumer>
// );

const highRouteContent = (Component)=> {
    //返回另一个组件
    return function RouterComponent(props) {
        // 最后使用context 渲染这个被封装组件
        return (
            <RemoveContext.Consumer>
                {remove => <Component {...props} remove={remove} />}
            </RemoveContext.Consumer>
        );
    };
}
export default withRouter(highRouteContent(RouteThree))