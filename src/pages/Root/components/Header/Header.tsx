import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ROUTES} from "@/utils/constants/routes.ts";
import {useHeader} from "@/pages/Root/components/Header/hooks/useHeader.ts";
import LoginDialog from "@/pages/Root/components/Header/components/LoginDialog/LoginDialog.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "lucide-react";

const Header = () => {
    const { state, functions } = useHeader()

    const NavigationContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`flex ${isMobile ? "flex-col gap-4 p-4" : "items-center gap-8"}`}>
            <NavLink to={ROUTES.ROOT} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                     className={({ isActive }) =>
                         isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                     }
            >
                {"О нас"}
            </NavLink>
            {state.authenticated && state.roles.includes('ADMIN') && (
                <>
                    <NavLink to={ROUTES.OPERATORS} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                        }
                    >
                        {"Операторы"}
                    </NavLink>
                    <NavLink to={ROUTES.DISH_CATEGORY} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                        }
                    >
                        {"Категории блюд"}
                    </NavLink>
                    <NavLink to={ROUTES.DISH_MANAGEMENT} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                        }
                    >
                        {"Блюда"}
                    </NavLink>
                    <NavLink to={ROUTES.ORDERS} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                        }
                    >
                        {"Заказы"}
                    </NavLink>
                </>
            )}
            {state.authenticated && state.roles.includes('OPERATOR') && (
                <NavLink to={ROUTES.ORDERS} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                    }
                >
                    {"Заказы"}
                </NavLink>
            )}
            {state.authenticated ? (
                <>
                    <NavLink to={ROUTES.PROFILE} onClick={isMobile ? () => functions.setIsMenuOpen(false) : undefined}
                             className={({ isActive }) =>
                                 isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                             }
                    >
                        {"Профиль"}
                    </NavLink>
                    <Button className="cursor-pointer" variant={isMobile ? "outline" : "default"}
                            onClick={() => {
                                functions.logout();
                                if (isMobile) functions.setIsMenuOpen(false);
                            }}
                    >
                        {"Выйти"}
                    </Button>
                </>
            ) : (
                <Button className="cursor-pointer" variant={isMobile ? "outline" : "default"}
                    onClick={() => {
                        functions.setIsOpenLogin(true);
                        if (isMobile) functions.setIsMenuOpen(false);
                    }}
                >
                    {"Войти"}
                </Button>
            )}
        </div>
    );

    return (
        <div className="flex justify-between items-center w-full h-[100px] border-b p-12">
            <p className="underline">HITS Delivery service</p>
            <div className="hidden xl:block">
                <NavigationContent/>
            </div>
            <div className="xl:hidden">
                <Sheet open={state.isMenuOpen} onOpenChange={functions.setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="mt-8">
                            <NavigationContent isMobile={true}/>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <LoginDialog isOpen={state.isOpenLogin} setIsOpen={functions.setIsOpenLogin} />
        </div>
    )
}

export default Header