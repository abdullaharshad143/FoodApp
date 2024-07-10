import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { Colors } from "../theme/color";
import Fonts from "../theme/typographic";
import { RootBottomParamList } from "../core/types";
import Header from "../components/Header";
import Button from "../components/Button";
import { db } from "../../config/firebase";
import { setUser } from "../redux/users/userSlices";
import { RootState } from "../redux/store";
import { format, nextSaturday } from "date-fns";

const SubscribeAndSaveScreen = ({ navigation }: NativeStackScreenProps<RootBottomParamList>) => {
    const [selectSubscription, setSelectSubscription] = useState(true);
    const [selectOneTime, setSelectOneTime] = useState(false);
    const [frequency, setFrequency] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const totalPrice = useSelector((state: RootState) => state.produce.totalPrice);
    const cartItems = useSelector((state: RootState) => state.produce.items);

    const priceWithDelivery = totalPrice ? totalPrice + 150 : 150;
    const oneTimePrice = priceWithDelivery + 200;

    const subscriptionSelection = useCallback(() => {
        setFrequency(1);
        setSelectOneTime(false);
        setSelectSubscription(true);
    }, []);

    const oneTimeSelection = useCallback(() => {
        setSelectSubscription(false);
        setSelectOneTime(true);
        setFrequency(0);
    }, []);

    const handleFrequencySelection = (selectedFrequency: number) => {
        setFrequency(selectedFrequency);
    };

    const handleCheckout = useCallback(async () => {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        const orderData = {
            userId,
            orderedItems: cartItems,
            totalPrice: selectOneTime ? oneTimePrice : priceWithDelivery,
            status: selectOneTime ? 'SCHEDULED' : 'ACTIVE',
            frequency: selectOneTime ? null : frequency,
            orderDate: new Date().toISOString(),
            nextPaymentDate: format(nextSaturday(new Date()), 'yyyy-MM-dd')
        };

        try {
            const collectionName = selectOneTime ? "oneTime" : "subscription";
            const docRef = doc(collection(db, collectionName));
            await setDoc(docRef, orderData);
            const userDocRef = doc(db, "users", userId || "");
            await updateDoc(userDocRef, {
                orderId: docRef.id,
                status: selectOneTime ? 'SCHEDULED' : 'ACTIVE',
                orderType: selectOneTime ? 'One Time' : 'Subscription',
            });
            dispatch(setUser({ status: selectOneTime ? 'SCHEDULED' : 'ACTIVE' }));
            navigation.navigate("ScheduledScreen");
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setLoading(false);
        }
    }, [selectOneTime, cartItems, totalPrice, navigation, frequency]);

    useEffect(() => {
        console.log("Inside Subscribe and Save Screen");
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Header text="Subscribe & Save" top={40} />
            <View style={{ padding: 20, marginTop: 50 }}>
                <TouchableOpacity
                    style={[styles.selectionContainer, { borderColor: selectSubscription ? Colors.lightOrange : 'black' }]}
                    onPress={subscriptionSelection}
                >
                    <View style={styles.flexRowStyle}>
                        <Text style={styles.selectionText}>{"Subscription"}</Text>
                        <Text style={styles.lightText}>Rs {priceWithDelivery}</Text>
                    </View>
                    {selectSubscription && (
                        <View>
                            <View style={[styles.flexRowStyle, { justifyContent: "flex-start" }]}>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { backgroundColor: frequency === 1 ? Colors.lightOrange : "white" }]}
                                    onPress={() => handleFrequencySelection(1)}
                                >
                                    <Text style={styles.buttonText}>{"Weekly"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { marginHorizontal: 40, backgroundColor: frequency === 2 ? Colors.lightOrange : "white" }]}
                                    onPress={() => handleFrequencySelection(2)}
                                >
                                    <Text style={styles.buttonText}>{"2 Weeks"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.flexRowStyle, { justifyContent: 'flex-start' }]}>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { backgroundColor: frequency === 3 ? Colors.lightOrange : "white" }]}
                                    onPress={() => handleFrequencySelection(3)}
                                >
                                    <Text style={styles.buttonText}>{"3 Weeks"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, { marginHorizontal: 40, backgroundColor: frequency === 4 ? Colors.lightOrange : "white" }]}
                                    onPress={() => handleFrequencySelection(4)}
                                >
                                    <Text style={styles.buttonText}>{"Monthly"}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.infoPoints}>{"• Easily pause and cancel"}</Text>
                            <Text style={styles.infoPoints}>{"• Save Rs 200 on each order"}</Text>
                            <Text style={styles.infoPoints}>{"• Previous box copied to next week"}</Text>
                            <Text style={styles.infoPoints}>{"• Set and forget or edit each week"}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.selectionContainer, { borderColor: selectOneTime ? Colors.lightOrange : 'black' }]}
                    onPress={oneTimeSelection}
                >
                    <View style={styles.flexRowStyle}>
                        <Text style={styles.selectionText}>{"One Time Purchase"}</Text>
                        <Text style={styles.lightText}>Rs {oneTimePrice}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.saveText}>{"*You can subscribe and easily pause all future orders and save Rs 200"}</Text>
            </View>
            <View style={styles.checkoutButton}>
                {loading ? (
                    <ActivityIndicator size={"large"} color={Colors.lightOrange} />
                ) : (
                    <Button title={selectSubscription ? `Checkout Rs ${priceWithDelivery}` : `Checkout Rs ${oneTimePrice}`} onPress={handleCheckout} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    selectionContainer: {
        borderWidth: 1,
        marginTop: verticalScale(20),
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(20),
        borderRadius: 10,
    },
    flexRowStyle: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    selectionText: {
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(20)
    },
    buttonText: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16),
    },
    lightText: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16),
        textAlignVertical: 'center'
    },
    buttonContainer: {
        padding: 10,
        width: horizontalScale(90),
        marginVertical: verticalScale(10),
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightOrange
    },
    infoPoints: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16),
        marginVertical: verticalScale(8)
    },
    saveText: {
        fontFamily: Fonts.Family.MediumItalic,
        color: Colors.slateGrey,
        marginHorizontal: horizontalScale(25)
    },
    checkoutButton: {
        alignItems: 'center',
        margin: 20
    }
});

export default SubscribeAndSaveScreen;
