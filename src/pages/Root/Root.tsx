import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from '@/components/ui/sonner';

const TOASTER_DURATION = 4000;
const Root = () => (
    <div className="min-h-screen flex flex-col">
        <Toaster duration={TOASTER_DURATION} />
        <Header/>
        <main className="flex-grow">
            <Outlet/>
        </main>
        <Footer/>
    </div>
)

export default Root