import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../core/types";
import BottomTab from './BottomTab'
import { useEffect } from "react";
import EditInfoScreen from "../EditScreens/EditInfoScreen";
import EditAddressInfoScreen from "../EditScreens/EditAddressInfoScreen";


const Stack = createNativeStackNavigator<RootStackParamList>()
export const HomeStack = () => {
    useEffect(() => {
        console.log("Inside Home Stack")
    }, [])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
            <Stack.Screen name="EditAddressInfoScreen" component={EditAddressInfoScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack