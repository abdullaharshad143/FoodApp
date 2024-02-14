import React from "react";
import { RootStackParamList } from "../core/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from '../screens/auth/signupScreen'
import LoginScreen from "../screens/auth/LoginScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AddressInfoScreen from "../screens/auth/AddressInfoScreen";


const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
            <Stack.Screen name = "SignupScreen" component={SignupScreen}/>
            <Stack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen}/>
            <Stack.Screen name = "AddressInfoScreen" component={AddressInfoScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack;