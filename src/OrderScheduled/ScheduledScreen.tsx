import { Text, View, StyleSheet, ActivityIndicator } from "react-native"
import { useCallback, useEffect, useState } from "react"
import { Colors } from "../theme/color"
import Fonts from "../theme/typographic"
import { RootBottomParamList } from "../core/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import OrderScheduled from "../components/OrderScheduled"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import Header from "../components/Header"

const ScheduledScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const userStatus = useSelector((state: any) => state.user.status);

    useEffect(() => {
        console.log("Inside Scheduled Screen");
    }, []);

    useFocusEffect(
        useCallback(() => {
            setStatus(userStatus);
            setLoading(false);
            console.log("><><", userStatus);
        }, [userStatus])
    );
    if (loading) {
        return (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size={"large"} color={Colors.lightOrange} />
            </View>
        )
    }

    return (
        <>
            {status === "ACTIVE" || status === "SCHEDULED" ? (
                <OrderScheduled onPress={() => navigation.navigate("HomeScreen")} />
            ) : (
                <>
                    <View style={styles.mainContainer}>
                        <Header text="Order Scheduled" top={40} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>{"You have no order scheduled right now!"}</Text>
                        </View>
                    </View>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    textStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: 16
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default ScheduledScreen