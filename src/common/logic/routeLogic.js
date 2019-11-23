import RouteOne from "../../feature/route/component/routeOne";
import RouteTwo from "../../feature/route/component/routeTwo";
import RouteThree from "../../feature/route/component/routeThree";
import Default from "../layout/default";

export const RouteMap = {
    index:{name:'index',component:Default},
    route_test_1:{name:'测试1',component:RouteOne},
    route_test_2: {name:'测试2',component:RouteTwo},
    route_test_3: {name:'测试3',component:RouteThree},
}