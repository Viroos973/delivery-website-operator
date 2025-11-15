export const getRoleRus = (role?: string) => {
    switch(role){
        case 'CLIENT':
            return ("Клиент")
        case 'ADMIN':
            return ("Админ")
        case 'OPERATOR':
            return ("Оператор")
        default:
            return ("Underfind")
    }
}