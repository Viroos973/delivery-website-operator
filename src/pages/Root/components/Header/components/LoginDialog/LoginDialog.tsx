import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import LoginOperatorForm
    from "@/pages/Root/components/Header/components/LoginDialog/components/LoginOperatorForm/LoginOperatorForm.tsx";

interface LoginDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const LoginDialog = ({isOpen, setIsOpen}: LoginDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>
                    {"Авторизация"}
                </DialogTitle>
            </DialogHeader>
            <LoginOperatorForm setIsOpen={setIsOpen} />
        </DialogContent>
    </Dialog>
)

export default LoginDialog;