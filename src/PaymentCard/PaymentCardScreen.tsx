import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../core/types";
import { Text, StyleSheet, TextInput, SafeAreaView, View, Alert } from "react-native";
import Header from "../components/Header";
import Fonts from "../theme/typographic";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import Button from "../components/Button";


const PaymentCardScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {

    useEffect(() => {
        console.log("Inside Payment Card Screen");
    }, [])
    return (
        <View style={styles.mainContainer}>
            <Header text="Payment Card" top={40} />
            <View style={styles.cardContainer}>
                <Icon style={{ marginHorizontal: 10 }} name="credit-card" size={25} color={"black"} />
                <Text style={styles.textStyle}>xxx-1111 11/2030</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Add a new card" onPress={() => alert("ok")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    cardContainer: {
        backgroundColor: Colors.lightGrey,
        justifyContent: 'center',
        padding: 15,
        marginTop: 120,
        width: '60%',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        flexDirection: 'row'
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        marginHorizontal: 10,
        textAlignVertical: 'center',
        fontSize: 16
    },
    buttonContainer: {
        flex: 0.9,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default PaymentCardScreen;