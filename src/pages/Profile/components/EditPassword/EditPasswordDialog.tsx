import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEditPasswordDialog } from "./hooks/useEditPasswordDialog";

interface ChangePasswordDialogProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const EditPasswordDialog  = ({setIsOpen, isOpen}: ChangePasswordDialogProps) => {
  const {form,
    functions } = useEditPasswordDialog(setIsOpen, isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Изменение пароля</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={functions.addNewPassword} className='w-full space-y-4'>
            <div className="flex flex-col gap-4 items-center">
              <FormField
                control={form.control}
                name="oldPassword1"
                render={({ field, fieldState }) => (
                  <FormItem className="w-[100%]">
                    <FormLabel className="text-sm font-normal">
                      {"Старый пароль"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Введите старый пароль" 
                        {...field} 
                        type="password"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword1"
                render={({ field, fieldState }) => (
                  <FormItem className="w-[100%]">
                    <FormLabel className="text-sm font-normal">
                      {"Новый пароль"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Введите новый пароль" 
                        {...field} 
                        type="password"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword2"
                render={({ field, fieldState }) => (
                  <FormItem className="w-[100%]">
                    <FormLabel className="text-sm font-normal">
                      {"Подтверждение пароля"}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Повторите старый пароль" 
                        {...field} 
                        type="password"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {form.formState?.errors?.root && (
                <p className="text-red-600 text-xs text-center mt-1">
                    {form.formState.errors.root.message}
                </p>
            )}
            <Button type='submit' className='h-10 w-full'>
              {"Изменить"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPasswordDialog;