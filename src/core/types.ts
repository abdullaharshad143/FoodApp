export type RootStackParamList = {
    SignupScreen: undefined
    Auth: undefined
    LoginScreen: undefined
    ForgotPasswordScreen: undefined
    AddressInfoScreen: undefined
    BottomTab: undefined
    HomeStack: { screen?: string }
    EditInfoScreen: undefined
    EditAddressInfoScreen: undefined
    AuthStack: { screen?: string }
    PaymentCardScreen: undefined
    SubscribeAndSaveScreen: undefined
    SearchScreen: undefined
}

export type RootBottomParamList = {
    OrdersScreen: undefined
    ProfileScreen: undefined
    ContactScreen: undefined
    HomeScreen: undefined
    CartScreen: undefined
    ScheduledScreen: undefined
    SearchScreen: undefined
}

export interface FormErrors {
    radio?: string
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    currentPassword?: string
    phoneNumber?: string
    postalCode?: string
    sector?: string
    streetNo?: string
    houseNo?: string
}

export interface FirebaseAuthError extends Error {
    code: string
    message: string
}

export interface IProduce {
    items?: any
    id: string
    name: string
    image: string
    // type: string
    marketPrice: string
    subText: string
    price: number
    category: string
    weight: string
    quantity?: number
    totalPrice?: number
} 

export interface CompleteOrder {
    id: string;
    status: string;
    nextPaymentDueDate: string;
    totalPrice: number;
    cartItems: IProduce[];
    [key: string]: any; 
}