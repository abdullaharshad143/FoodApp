import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Fonts from "../theme/typographic";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { format, addDays, differenceInDays, nextTuesday, nextSaturday, isAfter } from "date-fns";

const UpcomingOrders = () => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const [nextOrders, setNextOrders] = useState<any[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserAndOrder();
    }, []);

    const getUserAndOrder = async () => {
        setLoading(true);

        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                throw new Error("User ID not found in AsyncStorage");
            }

            const userDocRef = doc(db, "users", userId);
            const userDocSnapShot = await getDoc(userDocRef);
            if (!userDocSnapShot.exists()) {
                throw new Error("User document not found");
            }

            const userData = userDocSnapShot.data() as { status: string, orderId: string };
            const { status, orderId } = userData;

            let collectionName: string;
            if (status === "ACTIVE") {
                collectionName = "subscription";
            } else if (status === "SCHEDULED") {
                collectionName = "oneTime";
            } else {
                throw new Error("Invalid status");
            }

            const orderDocRef = doc(db, collectionName, orderId);
            const orderDocSnapShot = await getDoc(orderDocRef);
            if (!orderDocSnapShot.exists()) {
                throw new Error("Order document not found");
            }

            const orderData = orderDocSnapShot.data();
            setOrderData(orderData);

            const frequency = orderData.frequency;

            const nextOrders = generateNextOrders(frequency);
            setNextOrders(nextOrders);
        } catch (error) {
            console.error("Error in getUserAndOrder:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateNextOrders = (frequency: number) => {
        const nextOrders = [];
        const today = new Date();

        for (let i = 0; i < 10; i++) {
            let deliveryDate = addDays(nextTuesday(today), i * (frequency * 7));
            let billingDate = addDays(nextSaturday(today), i * (frequency * 7));
            
            if (isAfter(billingDate, deliveryDate)) {
                deliveryDate = addDays(deliveryDate, 7);
            }

            const daysUntilDelivery = differenceInDays(deliveryDate, today);
            const daysUntilBilling = differenceInDays(billingDate, today);

            nextOrders.push({
                deliveryDate: format(deliveryDate, 'PPPP'),
                daysUntilDelivery,
                billingDate: format(billingDate, 'PPPP'),
                daysUntilBilling,
            });
        }

        return nextOrders;
    };

    //@ts-ignore
    const renderOrderItem = ({ item }) => (
        <View style={[styles.orderItemContainer, orderData?.status === "PAUSE" ? styles.disabledOrder : null]}>
            <View style={styles.iconContainer}>
                <Icon name="calendar" size={24} color={orderData?.status === "PAUSE" ? '#ccc' : '#000000'} />
            </View>
            <View style={styles.orderDetails}>
            <Text style={[styles.orderText, orderData?.status === "PAUSE" ? styles.disabledText : null]}>Billing: {item.billingDate} (in {item.daysUntilBilling} days)</Text>
            <Text style={[styles.orderText, orderData?.status === "PAUSE" ? styles.disabledText : null]}>Delivery: {item.deliveryDate} (in {item.daysUntilDelivery} days)</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#000000" />
            ) : (
                orderData ? (
                    <View>
                        <View style={styles.headerContainer}>
                            <Icon name="calendar" size={30} color={"#000000"} />
                            <Text style={styles.headerText}>Upcoming Orders</Text>
                        </View>
                        <Text style={styles.totalPriceText}>Total Price: {orderData.totalPrice} Rs</Text>
                        <View style={{padding:10}}>
                        <FlatList
                            data={nextOrders}
                            renderItem={renderOrderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.orderList}
                            showsVerticalScrollIndicator={false}
                        />
                            </View>
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Icon name="calendar" size={30} color={"#000000"} />
                        <Text style={styles.emptyText}>No upcoming orders yet 😊</Text>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        paddingVertical: verticalScale(30)
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    headerText: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(22),
        color: '#000000',
        marginLeft: horizontalScale(10),
    },
    totalPriceText: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(18),
        color: '#333',
        marginBottom: verticalScale(10),
    },
    orderList: {
        marginTop: verticalScale(10),
    },
    orderItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    iconContainer: {
        marginRight: horizontalScale(15),
    },
    orderDetails: {
        flex: 1,
    },
    orderText: {
        fontFamily: Fonts.Family.Regular,
        fontSize: moderateScale(16),
        color: '#333',
        marginBottom: verticalScale(5),
    },
    disabledOrder: {
        opacity: 0.6,
    },
    disabledText: {
        color: '#ccc',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: Fonts.Family.Regular,
        fontSize: moderateScale(18),
        color: '#777',
        marginTop: verticalScale(10),
    },
});

export default UpcomingOrders;
