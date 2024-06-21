import { Text, View, StyleSheet, FlatList, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { useCallback, useEffect, useState } from "react"
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive"
import { Colors } from "../theme/color"
import SearchComponent from "../components/SearchComponent"
import FoodCard from "../components/FoodCard"
import Fonts from "../theme/typographic"
import { IProduce, RootBottomParamList, RootStackParamList } from "../core/types"
import FloatingButton from "../components/FloatingButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import Header from "../components/Header"
import SmallButton from "../components/SmallButton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Button from "../components/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { setUser } from "../redux/users/userSlices"
import { UseDispatch } from "react-redux"


const SubscribeAndSaveScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [selectSubscription, setSelectSubscription] = useState(true)
    const [selectOneTime, setSelectOneTime] = useState(false)
    const [weeklyFrequency, setWeeklyFrequency] = useState(true)
    const [twoWeeksFrequency, setTwoWeeksFrequency] = useState(false)
    const [threeWeeksFrequency, setThreeWeeksFrequency] = useState(false)
    const [fourWeeksFrequency, setfourWeeksFrequency] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const totalPrice = useSelector((state: RootState) => state.produce.totalPrice);
    const cartItems = useSelector((state: RootState) => state.produce.items);
    // console.log(cartItems)
    let priceWithDelivery = 150
    if (totalPrice) {
        priceWithDelivery += totalPrice
    }
    const oneTimePrice = priceWithDelivery + 200
    const subscriptionSelection = useCallback(() => {
        setWeeklyFrequency(true)
        setSelectOneTime(false)
        setSelectSubscription(true)
    }, [])
    const oneTimeSelection = useCallback(() => {
        setSelectSubscription(false)
        setSelectOneTime(true)
        setWeeklyFrequency(false)
        setTwoWeeksFrequency(false)
        setThreeWeeksFrequency(false)
        setfourWeeksFrequency(false)
    }, [])
    const weeklyFrequencySelection = useCallback(() => {
        setWeeklyFrequency(true)
        setTwoWeeksFrequency(false)
        setThreeWeeksFrequency(false)
        setfourWeeksFrequency(false)
    }, [])
    const twoWeeksFrequencySelection = useCallback(() => {
        setWeeklyFrequency(false)
        setTwoWeeksFrequency(true)
        setThreeWeeksFrequency(false)
        setfourWeeksFrequency(false)
    }, [])
    const threeWeeksFrequencySelection = useCallback(() => {
        setWeeklyFrequency(false)
        setTwoWeeksFrequency(false)
        setThreeWeeksFrequency(true)
        setfourWeeksFrequency(false)
    }, [])
    const fourWeeksFrequencySelection = useCallback(() => {
        setWeeklyFrequency(false)
        setTwoWeeksFrequency(false)
        setThreeWeeksFrequency(false)
        setfourWeeksFrequency(true)
    }, [])
    const handleCheckout = useCallback(async () => {
        setLoading(true)
        const userId = await AsyncStorage.getItem('userId')
        const orderData = {
            userId,
            orderedItems: cartItems,
            totalPrice: selectOneTime ? oneTimePrice : priceWithDelivery,
            status: selectOneTime ? 'SCHEDULED' : 'ACTIVE',
            frequency: weeklyFrequency ? 1 : twoWeeksFrequency ? 2 : threeWeeksFrequency ? 3 : fourWeeksFrequency ? 4 : null,
            orderdate: new Date().toISOString()
        }

        try {
            if (selectOneTime) {
                const oneTimeDocRef = doc(collection(db, "oneTime"));
                await setDoc(oneTimeDocRef, orderData);
                const userDocRef = doc(db, "users", userId || "");
                await updateDoc(userDocRef, {
                    orderCollectionId: oneTimeDocRef.id,
                });
            } else {
                const subscriptionDocRef = doc(collection(db, "subscription"));
                await setDoc(subscriptionDocRef, orderData);
                const userDocRef = doc(db, "users", userId || "");
                await updateDoc(userDocRef, {
                    orderId: subscriptionDocRef.id,
                });
            }
            const userDocRef = doc(db, "users", userId || "");
            await updateDoc(userDocRef, {
                status: selectOneTime ? 'SCHEDULED' : 'ACTIVE',
                orderType: selectOneTime ? 'One Time' : 'Subscription',
            });
            dispatch(
                setUser({
                    status: selectOneTime ? 'SCHEDULED' : 'ACTIVE',
                })
            )
            navigation.navigate("ScheduledScreen")
        } catch (error) {
            console.error("Error adding document: ", error)
        }
        finally {
            setLoading(false)
        }
    }, [selectOneTime, cartItems, totalPrice, navigation])
    useEffect(() => {
        console.log("Inside Subscribe and Save Screen")
    }, [])


    return (
        <View style={styles.mainContainer}>
            <Header text="Subscribe & Save" top={40} />
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={[styles.subscriptionContainer, { borderColor: selectSubscription ? Colors.lightOrange : 'black' }]} onPress={subscriptionSelection}>
                    <View style={styles.flexRowStyle}>
                        <Text style={styles.subscriptionText}>{"Subscription"}</Text>
                        <Text style={styles.lightText}>Rs {priceWithDelivery}</Text>
                    </View>
                    <View style={[styles.flexRowStyle, { justifyContent: "flex-start" }]}>
                        <TouchableOpacity disabled={selectSubscription ? false : true} style={[styles.buttonContainer, { backgroundColor: weeklyFrequency ? Colors.lightOrange : "white" }]} onPress={weeklyFrequencySelection}>
                            <Text style={styles.buttonText}>{"Weekly"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={selectSubscription ? false : true} style={[styles.buttonContainer, { marginHorizontal: 40, backgroundColor: twoWeeksFrequency ? Colors.lightOrange : "white" }]} onPress={twoWeeksFrequencySelection}>
                            <Text style={styles.buttonText}>{"  2 Weeks"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flexRowStyle, { justifyContent: 'flex-start' }]}>
                        <TouchableOpacity disabled={selectSubscription ? false : true} style={[styles.buttonContainer, { backgroundColor: threeWeeksFrequency ? Colors.lightOrange : "white" }]} onPress={threeWeeksFrequencySelection}>
                            <Text style={styles.buttonText}>{"3 Weeks"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={selectSubscription ? false : true} style={[styles.buttonContainer, { marginHorizontal: 40, backgroundColor: fourWeeksFrequency ? Colors.lightOrange : "white" }]} onPress={fourWeeksFrequencySelection}>
                            <Text style={styles.buttonText}>{"Monthly"}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoPoints}>{"• Easily pause and cancel"}</Text>
                    <Text style={styles.infoPoints}>{"• Save Rs 200 on each order"}</Text>
                    <Text style={styles.infoPoints}>{"• Previous box copied to next week"}</Text>
                    <Text style={styles.infoPoints}>{"• Set and forget or edit each week"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.oneTimeContainer, { borderColor: selectOneTime ? Colors.lightOrange : 'black' }]} onPress={oneTimeSelection}>
                    <View style={styles.flexRowStyle}>
                        <Text style={styles.subscriptionText}>{"One Time Purchase"}</Text>
                        <Text style={styles.lightText}>Rs {oneTimePrice}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.saveText}>{"*You can subscriibe and easily pause all future orders and save Rs 200"}</Text>
            </View>
            <View style={styles.checkoutButton}>
                {loading ? (
                    <>
                        <ActivityIndicator size={"large"} color={Colors.lightOrange} />
                    </>
                ) : (
                    <Button title={selectSubscription ? `Checkout Rs ${priceWithDelivery}` : `Checkout Rs ${oneTimePrice}`} onPress={handleCheckout} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    subscriptionContainer: {
        borderWidth: 1,
        marginTop: verticalScale(100),
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(20),
        borderRadius: 10,
        // borderColor: 'black'
    },
    flexRowStyle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        // marginHorizontal: 20
    },
    subscriptionText: {
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
        // backgroundColor: Colors.lightOrange,
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
    oneTimeContainer: {
        borderWidth: 1,
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(20),
        borderRadius: 10,
        // borderColor: Colors.lightOrange,
        marginTop: verticalScale(20)
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

export default SubscribeAndSaveScreen