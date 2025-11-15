interface About {
    companyName: string,
    contactEmail: string,
    mailAddress: string,
    managerPhone: string,
    operatorPhone: string
}

interface DetailAbout extends About {
    id: string
}

interface Operator {
    id: string;
    role: string;
    createTime: string;
    fullName: string;
    phone: string;
    username: string;
}

interface NewOperatorDTO {
    fullName: string;
    password: string;
    phone: string;
    username: string;
}

interface UserProfileDTO{
    id: string;
    role: string;
    fullName: string;
    phone: string;
}

interface UserNewPasswordDTO{
    oldPassword1: string;
    newPassword1: string;
    newPassword2: string;
}

interface ShortUserOrdersDTO{
    inProcess: number;
    completed: number;
}

interface Dish {
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    rate: number;
    photos: string[];
    isAvailable: boolean;
}

interface DetailDish extends Dish {
    ingredients: string[];
}

interface GetDetailDish {
    foodDetails: DetailDish;
    couldRate: boolean;
    hasRate: boolean;
    userRating: number;
}

interface Categories {
    id: string,
    name: string,
    description: string
}

interface Stat {
    id: string,
    fullName: string,
    orderAmount: number
}

interface ItemCart {
    dishId: string,
    name: string,
    price: number,
    imageUrl?: string,
    quantity: number
}

interface Cart {
    total: number,
    items: ItemCart[]
}

interface Reservation {
    id: string;
    orderNumber: number;
    clientId: string;
    address: string;
    phoneNumber: string;
    comment?: string;
    price: number;
    declineReason?: string;
    operatorId?: string;
    operatorName: string;
    date: string;
    status: OrderStatus;
    payWay?: OrderPayWay;
}

interface Order {
    reservation: Reservation;
    meal: Meal[];
}

interface OrderAnswer {
    totalPages: number,
    totalElements: number,
    size: number,
    content: Order[],
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    last: boolean,
    pageable: {
        offset: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    empty: boolean
}

enum OrderStatus {
    NEW = "NEW",
    CONFIRMED = "CONFIRMED",
    COOKING = "COOKING",
    WAITING_FOR_COURIER = "WAITING_FOR_COURIER",
    TOOK_BY_COURIER = "TOOK_BY_COURIER",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}

enum OrderPayWay {
    CASH = "CASH",
    CARD = "CARD",
    ONLINE = "ONLINE"
}

interface Meal {
    id: string;
    name: string;
    price: number;
    imageUrl: string[];
    quantity: number;
}

interface NewComment {
    comment: string;
}

interface Status {
    id: string;
    name: string;
}

interface StatusHistory {
    id: string;
    orderId: string;
    status: OrderStatus;
    date: string;
}

interface Reason {
    reason: string;
}

interface NewDishDTO {
    name: string;
    categoryId: string;
    photo?: string;
    rate: number;
    price: number;
    description: string;
    ingredients: string[];
}

interface EditDishDTO {
    name: string;
    categoryId: string;
    photo?: string;
    rate: number;
    price: number;
    description: string;
    ingredients: string[];
    isAvailable: boolean;
}

interface Token {
    accessToken: string;
    refreshToken: string;
}

interface MutationSettings<Params = void, Func = unknown> {
    config?: ApiRequestConfig;
    options?: import('@tanstack/react-query').UseMutationOptions<
        Awaited<ReturnType<Func>>,
        any,
        Params,
        any
    >;
}

interface QuerySettings<Func = unknown> {
    config?: ApiRequestConfig;
    options?: Omit<
        import('@tanstack/react-query').UseQueryOptions<
            Awaited<ReturnType<Func>>,
            any,
            Awaited<ReturnType<Func>>,
            any
        >,
        'queryKey'
    >;
}

interface InfiniteQuerySettings<Func = unknown> {
    config?: ApiRequestConfig;
    options?: Omit<
        import('@tanstack/react-query').UseInfiniteQueryOptions<
            Awaited<ReturnTyp<Func>>,
            any,
            Awaited<ReturnTyp<Func>>,
            any,
            import('@tanstack/react-query').QueryKey,
            string | undefined
        >,
        'queryKey'
    >;
}

type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
    ? {
        config?: ApiRequestConfig;
    }
    : {
        params: Params;
        config?: ApiRequestConfig;
    };