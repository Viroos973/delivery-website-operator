import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import "@/tracker";

const App = () => (
    <RouterProvider router={router} />
)

export default App;