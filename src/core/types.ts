export type RootStackParamList = {
    SignupScreen: undefined
    Auth: undefined
    LoginScreen: undefined
    ForgotPasswordScreen: undefined
    AddressInfoScreen: undefined
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