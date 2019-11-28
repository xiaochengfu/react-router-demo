import  RouterContext  from "../context/routerContext";
import React from "react";

//组件中需要使用路由跳转的，需要引用此组件
export default function TabRouter(Component) {
    //返回另一个组件
    return (props) => {
        // 最后使用context 渲染这个被封装组件
        return (
            <RouterContext.Consumer>
                {context => <Component {...props} remove={context.remove} />}
            </RouterContext.Consumer>
        );
    };
}