import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet } from "react-native";
import { RootStackParamList } from "../core/types";
import { TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import Fonts from "../theme/typographic";
import { verticalScale } from "../utils/responsive";
import UpcomingOrders from "./UpcomingOrdersScreen";
import PastOrders from "./PastOrdersScreen";

const OrdersScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [index, setIndex] = useState(0);
    // Correctly initialize the routes state with an array of route objects
    const [routes] = useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'past', title: 'Past' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'upcoming':
                return <UpcomingOrders />
            case 'past':
                return <PastOrders />
            default:
                return null;
        }
    };

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
            renderLabel={({ route, focused, color }) => (
                <Text style={[styles.labelText, { color: focused ? 'black' : 'grey', }]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: '#fff', // Customize tab bar background
        paddingTop: verticalScale(30)
    },
    indicator: {
        backgroundColor: 'black', // Customize tab indicator color
    },
    label: {
        color: 'black', // Customize tab label color
    },
    labelText: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: 20
    }
});

export default OrdersScreen;
