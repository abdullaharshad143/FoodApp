import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Fonts from "../theme/typographic";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { format, addDays, differenceInDays, nextTuesday, nextSaturday, isAfter } from "date-fns";

interface OrderData {
    status: string;
    orderId: string;
    deliveryDate?: Timestamp;
    frequency?: number;
    totalPrice?: number;
}

const UpcomingOrders = () => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [nextOrder, setNextOrder] = useState<any>(null); // Changed to singular for one-time orders
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

            const userData = userDocSnapShot.data() as OrderData | undefined;
            if (!userData) {
                throw new Error("User data is undefined");
            }

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
            setOrderData(orderData as OrderData);

            if (status === "SCHEDULED") {
                let deliveryDate: string | undefined = "Date not available";
                let daysUntilDelivery: number | string = "N/A";
                let billingDate: string | undefined = "Date not available";
                let daysUntilBilling: number | string = "N/A";
            
                const today = new Date();
                let nextTuesdayDate = nextTuesday(today);
                const nextSaturdayDate = nextSaturday(today);
            
                if (isAfter(nextSaturdayDate, nextTuesdayDate)) {
                    nextTuesdayDate = addDays(nextTuesdayDate, 7);
                }
            
                daysUntilBilling = differenceInDays(nextSaturdayDate, today);
                daysUntilDelivery = differenceInDays(nextTuesdayDate, today);
            
                billingDate = format(nextSaturdayDate, 'PPPP');
                deliveryDate = format(nextTuesdayDate, 'PPPP');
            
                setNextOrder({
                    deliveryDate,
                    daysUntilDelivery,
                    billingDate,
                    daysUntilBilling,
                });
            }            
             else {
                const frequency = orderData.frequency;
                const nextOrders = generateNextOrders(frequency);
                setNextOrder(nextOrders);
            }
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

    const renderOrderItem = ({ item }: { item: any }) => (
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
                        <FlatList
                            data={orderData.status === "SCHEDULED" ? [nextOrder] : nextOrder} // Render single order if status is SCHEDULED
                            renderItem={renderOrderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.orderList}
                            showsVerticalScrollIndicator={false}
                        />
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
