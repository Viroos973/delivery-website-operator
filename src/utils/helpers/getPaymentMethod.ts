export const getPaymentMethod = (paymentMethod?: string): string => {
    switch (paymentMethod) {
        case 'CARD_ONLINE':
            return 'Картой на сайте'
        case 'CARD_COURIER':
            return 'Картой курьеру'
        case 'CASH_COURIER':
            return 'Наличными курьеру'
        default:
            return 'Новый'
    }
}