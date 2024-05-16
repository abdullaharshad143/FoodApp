import { ImageProps } from "react-native"

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
}

export type RootBottomParamList = {
    OrdersScreen: undefined
    ProfileScreen: undefined
    ContactScreen: undefined
    HomeScreen: undefined
    CartScreen: undefined
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
    image: ImageProps
    // type: string
    marketPrice: string
    subText: string
    price: number
    category: string
    weight: string
    quantity?: number
    totalPrice?: number
}