import {useProfile} from "@/pages/Profile/hooks/useProfile.ts";
import {Button} from "@/components/ui/button.tsx";
import EditPassword from "./components/EditPassword/EditPasswordDialog";
import { getRoleRus } from "./helpers/getRoleRus";

const Profile = () => {
    const { state, functions } = useProfile()
 
    return (
        <div className="mx-auto flex flex-col p-8 justify-center items-center">
            <div className="flex flex-col border border-black rounded-lg py-6 px-10 gap-6 w-full max-w-[600px]">
                <span className='text-4xl font-medium text-center flex-1'>Ваши данные</span>
                <div className="flex flex-col">
                    <label htmlFor="fullName">ФИО:</label>
                    <input type="text" id="fullName" value={state.userProfile.data?.data.fullName} readOnly/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phoneNumber">Номер телефона:</label>
                    <input type="text" id="phoneNumber" value={state.userProfile.data?.data.phone} readOnly/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="role">Роль:</label>
                    <input type="text" id="role" value={getRoleRus(state.userProfile.data?.data.role)} readOnly/>
                </div>
                <div>
                    <Button className="w-full cursor-pointer" onClick={() => functions.setIsOpen(true)}>
                        {"Изменить пароль"}
                    </Button>
                    <EditPassword isOpen={state.isOpen} setIsOpen={functions.setIsOpen}/>
                </div>
            </div>
        </div>
    )
}

export default Profile