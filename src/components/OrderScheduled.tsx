import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'
import { moderateScale, verticalScale } from "../utils/responsive";
import Fonts from "../theme/typographic";
import { Colors } from "../theme/color";
import Button from "./Button";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../config/firebase";
import { setPaymentSuccess } from "../redux/orders/paymentSlices";
import { formatDate } from "../utils/formatDate";
import { getNextSaturday } from "../utils/date";


interface OrderScheduledProps {
    onPress?: () => void;
}

const OrderScheduled: React.FC<OrderScheduledProps> = ({ onPress }) => {
    useEffect(() => {
    }, [])
    const [loading, setLoading] = useState(false)
    const data = useSelector((state: any) => state.user)
    const status = data.status
    const totalPrice = useSelector((state: RootState) => state.produce.totalPrice);
    const dispatch = useDispatch();
    const priceWithDelivery = totalPrice ? totalPrice + 150 : 150;
    const oneTimePrice = priceWithDelivery + 200;
    const priceToMake = status === "ACTIVE" ? priceWithDelivery : oneTimePrice
    const paymentSuccess = useSelector((state: any) => state.payment.paymentSuccess);
    // console.log("oneTimePrice: ",oneTimePrice)
    // console.log("priceWithDelivery: ",priceWithDelivery)
    // console.log("status: ",status)
    const deliveryDate = useSelector((state: any) => state.delivery.deliveryDate);
    const deliveryFormattedDate = formatDate(deliveryDate)
    const nextSaturday = getNextSaturday();

    const handlePaymentSuccess = async () => {
        try {
            setLoading(true)
            const orderCollection = status === "ACTIVE" ? "subscription" : "oneTime"
            const userId = await AsyncStorage.getItem('userId');
            const userDocRef = doc(db, "users", userId || "");
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const orderId = userData.orderId;
                if (orderId) {
                    const orderDocRef = doc(db, orderCollection, orderId);
                    await updateDoc(orderDocRef, {
                        paymentSuccess: true
                    });
                    dispatch(setPaymentSuccess(true));
                    console.log("Payment status updated successfully.");
                }
            } else {
                console.error("No such user document!");
                return null;
            }
        } catch (error) {
            console.error("Error updating payment status: ", error);
        } finally {
            setLoading(false)
        }
    };

    const fetchClientSecret = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5001/foodapp-26d02/us-central1/foodApi/api/v1/payments/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: priceToMake * 100,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch client secret');
            }

            const { clientSecret } = await response.json();
            return clientSecret;
        } catch (error) {
            console.error('Error fetching client secret:', error);
            alert('An error occured. Please try again later.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handlePayNowPress = async () => {
        setLoading(true)
        try {
            const clientSecret = await fetchClientSecret();
            if (!clientSecret) return;

            await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: "FoodApp"
            });

            const { error } = await presentPaymentSheet();
            if (error) {
                alert('An error occured. Please try again later.');
            } else {
                await handlePaymentSuccess();
                alert('Payment Successful');
                // Handle success scenario (e.g., navigate to success screen)
            }
        } catch (error) {
            console.error('Error handling checkout:', error);
        } finally {
            setLoading(false)
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingStyle}>{"Order Scheduled"}</Text>
            {/* <View style={styles.contentContainer}>
                <View>
                    <Icon style={styles.iconStyle} name="credit-card" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.textStyle}>{`Billing on ${saturdayFormattedDate}`}</Text>
                    <Text style={styles.lightTextStyle}>{"At cut off 11:59pm"}</Text>
                </View>
            </View> */}
            <View style={styles.contentContainer}>
                <View>
                    <Icon style={styles.iconStyle} name="truck" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.textStyle}>{`Delivery on ${nextSaturday}`}</Text>
                    <Text style={styles.lightTextStyle}>{"Before 6:30pm"}</Text>
                </View>
            </View>
            {/* <View> */}
            {!paymentSuccess &&
                <>
                    <Button title="Edit Order" onPress={onPress} />
                    <Button title={`Pay Now Rs ${priceToMake} `} onPress={handlePayNowPress} loading={loading} /></>
            }
            {/* </View> */}
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextStyle}>{"You can edit your order before making payment"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.authBackground
    },
    headingStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: 28,
        color: Colors.slateGrey,
        margin: 20
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: 18,
    },
    lightTextStyle: {
        fontFamily: Fonts.Family.Regular,
        color: Colors.lightGrey,
        marginTop: 5
    },
    infoTextStyle: {
        fontFamily: Fonts.Family.BoldItalic,
    },
    infoTextContainer: {
        marginTop: 20
    },
    contentContainer: {
        flexDirection: "row",
        paddingVertical: 15
    },
    iconStyle: {
        margin: 10
    }
})

export default OrderScheduled;