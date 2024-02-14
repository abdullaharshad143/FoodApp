import React from "react";
import { RootStackParamList } from "../core/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from '../screens/auth/signupScreen'
import LoginScreen from "../screens/auth/LoginScreen";


const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
            <Stack.Screen name = "SignupScreen" component={SignupScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack;