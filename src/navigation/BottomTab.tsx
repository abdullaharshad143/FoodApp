import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomParamList } from "../core/types";
import HomeScreen from "../Home/HomeScreen";
import OrdersScreen from "../Orders/OrdersScreen";
import CartScreen from "../Cart/CartScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import ContactScreen from "../Contact/ContactScreen";
import Fonts from "../theme/typographic";
import { moderateScale, verticalScale } from "../utils/responsive";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useEffect } from "react";
import { Colors } from "../theme/color";

const Tab = createBottomTabNavigator<RootBottomParamList>()

const BottomTab = () => {
    useEffect(() => {
        console.log("Inside Bottom Tab")
    }, [])
    return (
        <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontFamily: Fonts.Family.SemiBold,
                    fontSize: moderateScale(12),
                    paddingBottom: verticalScale(10)
                },
                tabBarActiveTintColor: Colors.blackText,
                tabBarInactiveTintColor: Colors.lightGrey,
                tabBarStyle: { paddingVertical: verticalScale(10) }
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    tabBarAllowFontScaling: false,
                    title: 'Shop',
                    tabBarIcon: ({ focused }) =>
                        <Icon
                            name='home'
                            color={focused ? Colors.blackText : Colors.lightGrey}
                            size={17}
                        />
                }}
            />
            <Tab.Screen name="CartScreen" component={CartScreen}
                options={{
                    tabBarAllowFontScaling: false,
                    title: 'Cart',
                    tabBarIcon: ({ focused }) =>
                        <Icon name='shopping-cart'
                            color={focused ? Colors.blackText : Colors.lightGrey}
                            size={17}
                        />
                }}
            />
            <Tab.Screen name="OrdersScreen" component={OrdersScreen}
                options={{
                    tabBarAllowFontScaling: false,
                    title: 'Orders',
                    tabBarIcon: ({ focused }) =>
                        <Icon name='list-ul'
                            color={focused ? Colors.blackText : Colors.lightGrey}
                            size={16}
                        />
                }}
            />
            <Tab.Screen name="ContactScreen" component={ContactScreen}
                options={{
                    tabBarAllowFontScaling: false,
                    title: 'Contact',
                    tabBarIcon: ({ focused }) =>
                        <Icon name='home'
                            color={focused ? Colors.blackText : Colors.lightGrey}
                            size={17}
                        />
                }}
            />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    tabBarAllowFontScaling: false,
                    title: 'Account',
                    tabBarIcon: ({ focused }) =>
                        <Icon name='user'
                            color={focused ? Colors.blackText : Colors.lightGrey}
                            size={17}
                        />
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTab