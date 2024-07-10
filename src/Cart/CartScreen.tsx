import { View, StyleSheet, ScrollView, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { verticalScale } from "../utils/responsive"
import { IProduce, RootBottomParamList, RootStackParamList, } from "../core/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import PaymentDetails from "../components/PaymentDetails"
import Header from "../components/Header"
import Cart from "../components/Cart"
import SmallButton from "../components/SmallButton"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import Fonts from "../theme/typographic"
import { clearCart } from "../redux/cart/cartSlices"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const CartScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    useEffect(() => {
        console.log("Inside Cart Screen")
    }, [])
    const cartItems = useSelector((state: RootState) => state.produce.items);
    const status = useSelector((state: any) => state.user.status);
    const totalPrice = useSelector((state: RootState) => state.produce.totalPrice);
    const paymentSuccess = useSelector((state: any) => state.payment.paymentSuccess);
    const priceWithDelivery = totalPrice ? totalPrice + 150 : 150;
    const oneTimePrice = priceWithDelivery + 200;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const clearTheCart = () => {
        dispatch(clearCart());
    }

    const handleUpdateOrder = useCallback(async () => {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) {
            console.error("User ID not found");
            setLoading(false);
            return;
        }

        try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                console.error("User document not found");
                setLoading(false);
                return;
            }

            const orderId = userDoc.data().orderId;

            if (!orderId) {
                console.error("Order ID not found");
                setLoading(false);
                return;
            }

            const orderData = {
                orderedItems: cartItems,
                totalPrice: status === "ACTIVE" ? priceWithDelivery : oneTimePrice,
                orderUpdateDate: new Date().toISOString(),
            };

            const collectionName = status === "ACTIVE" ? "subscription" : "oneTime";
            const orderDocRef = doc(db, collectionName, orderId);
            await updateDoc(orderDocRef, orderData);
            alert("Order Updated!");
        } catch (error) {
            console.error("Error updating document: ", error);
        } finally {
            setLoading(false);
        }
    }, [cartItems, totalPrice, navigation, dispatch]);

    return (
        <>
            {cartItems.length > 0 ? (
                <ScrollView style={styles.mainContainer}>
                    <Header text="Cart" top={40} />
                    <View style={styles.cartItemsContainer}>
                        {!paymentSuccess && (
                            <View style={{ alignItems: 'flex-end', marginHorizontal: 15 }}>
                                <SmallButton title="Clear Cart" onPress={clearTheCart} />
                            </View>
                        )}
                        <Cart />
                    </View>
                    <View style={styles.paymentDetailsContainer}>
                        <PaymentDetails />
                    </View>
                    {!paymentSuccess && (
                        <View style={styles.buttonContiner}>
                            {status === "ACTIVE" || "SCHEDULED" || "PAUSE" ? (
                                <SmallButton title="Update" loading={loading} onPress={handleUpdateOrder} />
                            ) : (
                                <SmallButton title="Checkout" onPress={() => navigation.navigate("SubscribeAndSaveScreen")} />
                            )}
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noItemsStyle}>
                    <Header text="Cart" top={40} />
                    <Text style={styles.noItemsTextStyle}>{'No items in the cart!'}</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    paymentDetailsContainer: {
        padding: 40,
        paddingTop: 0
    },
    cartItemsContainer: {
        paddingTop: verticalScale(80)
    },
    buttonContiner: {
        alignItems: 'center'
    },
    noItemsStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    noItemsTextStyle: {
        fontFamily: Fonts.Family.BoldItalic,
        fontSize: 18,
        color: "orange",
        textAlign: 'center'
    }

});



export default CartScreen