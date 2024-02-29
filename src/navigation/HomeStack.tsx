import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../core/types";
import BottomTab from './BottomTab'
import { useEffect } from "react";


const Stack = createNativeStackNavigator<RootStackParamList>()
export const HomeStack = () => {
    useEffect (()=> {
        console.log("Inside Home Stack")
    }, [])
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name = "BottomTab" component={BottomTab}/>
        </Stack.Navigator>
    );
}

export default HomeStack