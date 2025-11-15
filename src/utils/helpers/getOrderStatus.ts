export const getOrderStatus = (status: string): string => {
    switch (status) {
        case 'NEW':
            return 'Новый'
        case 'CONFIRMED':
            return 'Подтвержденный'
        case 'COOKING':
            return 'Готовится'
        case 'WAITING_FOR_COURIER':
            return 'В ожидании курьера'
        case 'TOOK_BY_COURIER':
            return 'Взят курьером'
        case 'COMPLETED':
            return 'Завершен'
        case 'CANCELED':
            return 'Отменен'
        default:
            return 'Новый'
    }
}