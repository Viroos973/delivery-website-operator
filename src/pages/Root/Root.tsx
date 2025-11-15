import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Root = () => (
    <div className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-grow">
            <Outlet/>
        </main>
        <Footer/>
    </div>
)

export default Root