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
        this.state.remove('route_test_3')
    }
    componentDidUpdate(){
        // console.log(tabMenu,CloseRouteContext);
        console.log(this.props);
    }
    render(){
        return (
            <RemoveContext.Consumer>
                {remove=>{
                    // this.setState({ remove: remove})
                      return <div >
                        123
                        <Button onClick={this.goto}>跳转</Button>
                        <Button onClick={()=>{
                              remove('route_test_3')
                        }}>关闭当前</Button>
                        </div>
                }}
            </RemoveContext.Consumer>
            

        )
    }
}
// let RouteThree1 = ()=>{
//     return <RemoveContext.Consumer>
//         {remove=>{
//             console.log(remove);
//             return <RouteThree {...remove} />
//         }}
//     </RemoveContext.Consumer>
// }
export default withRouter(RouteThree)