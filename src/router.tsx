import {createHashRouter} from "react-router-dom";
import { ROUTES } from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import About from "./pages/About/About";
import DishDetail from "@/pages/DishDetail/DishDetail.tsx";
import Operators from "./pages/Operators/Operators";
import DishManagement from "./pages/DishManagement/DishManagement";
import Profile from "@/pages/Profile/Profile.tsx";
import Orders from "./pages/Orders/Orders";
import Statistics from "@/pages/Statistics/Statistics.tsx";
import DishCategory from "@/pages/DishCategory/DishCategory.tsx";
import OrderDetail from "./pages/OrderDetail/OrderDetail";

export const router = createHashRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <About />
            },
            {
                path: ROUTES.DISH_DETAILS,
                element: <DishDetail />
            },
            {
                path: ROUTES.OPERATORS,
                element: <Operators />
            },
            {
                path: ROUTES.DISH_MANAGEMENT,
                element: <DishManagement />
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile/>
            },
            {
                path: ROUTES.ORDERS,
                element: <Orders />
            },
            {
                path: ROUTES.STATISTICS,
                element: <Statistics />
            },
            {
                path: ROUTES.DISH_CATEGORY,
                element: <DishCategory />
            },
            {
                path: ROUTES.ORDER_DETAILS,
                element: <OrderDetail />
            }
        ]
    }
])