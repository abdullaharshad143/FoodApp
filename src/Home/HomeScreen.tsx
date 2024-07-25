import { Text, View, StyleSheet, FlatList, ScrollView, Image, TextInput, ListRenderItem, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native"
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
import OrderScheduled from "../components/OrderScheduled"
import { foodData } from "./data"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { db } from "../../config/firebase"
import { setItems } from "../redux/cart/cartSlices"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/users/userSlices"
import { useFocusEffect } from "@react-navigation/native"
import { FontAwesome as Icon } from "@expo/vector-icons";
import { setPaymentSuccess } from "../redux/orders/paymentSlices"
import { checkAndUpdateOrderStatus } from "../utils/checkAndUpdateOrderStatus"
import { setDeliveryDate } from "../redux/orders/deliveryDateSlice"

const HomeScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [loading, setLoading] = useState(false)
    const paymentSuccess = useSelector((state: any) => state.payment.paymentSuccess);
    const data = useSelector((state: any) => state.user)
    const status = data.status
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Inside Home Screen")
    }, [])
    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );
    const getUser = async () => {
        setLoading(true)
        try {
            await checkAndUpdateOrderStatus();
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                throw new Error("User ID not found in AsyncStorage");
            }

            const userDocRef = doc(db, "users", userId);
            const userDocSnapShot = await getDoc(userDocRef);

            if (userDocSnapShot.exists()) {
                const { status } = userDocSnapShot.data() as { status: string };
                let orderedItems: IProduce[] = [];

                if (userDocSnapShot.exists()) {
                    const { status, orderId } = userDocSnapShot.data() as { status: string; orderId: string };

                    if (status === "ACTIVE" || status === "PAUSE") {
                        const subscriptionDocRef = doc(db, "subscription", orderId);
                        const subscriptionDoc = await getDoc(subscriptionDocRef);

                        if (subscriptionDoc.exists()) {
                            orderedItems = subscriptionDoc.data().orderedItems as IProduce[];
                            dispatch(setPaymentSuccess(subscriptionDoc.data().paymentSuccess))
                            dispatch(setDeliveryDate(subscriptionDoc.data().nextPaymentDueDate));
                        }
                    } else if (status === "SCHEDULED") {
                        const oneTimeDocRef = doc(db, "oneTime", orderId);
                        const oneTimeDoc = await getDoc(oneTimeDocRef);

                        if (oneTimeDoc.exists()) {
                            orderedItems = oneTimeDoc.data().orderedItems as IProduce[];
                            dispatch(setPaymentSuccess(oneTimeDoc.data().paymentSuccess))
                            dispatch(setDeliveryDate(oneTimeDoc.data().nextPaymentDueDate));
                        }
                    }
                }

                dispatch(setUser({ status }));
                //@ts-ignore
                dispatch(setItems(orderedItems));
            } else {
                dispatch(setUser({ status: "" }));
            }
        } catch (error) {
            console.error("Error getting user document:", error);
            // Handle error as needed
        } finally {
            setLoading(false);
        }
    };

    // const foodData: IProduce[] = [
    //     { id: '1', name: 'Apple', price: 199, marketPrice: '2.49', subText: 'Fresh and juicy', category: 'Fruit', weight: '1kg', image: require('../assets/apples.jpg') },
    //     { id: '2', name: 'Banana', price: 99, marketPrice: '1.29', subText: 'Rich in potassium', category: 'Fruit', weight: '1dozen', image: require('../assets/apples.jpg') },
    //     { id: '3', name: 'Carrot', price: 79, marketPrice: '0.99', subText: 'High in Vitamin A', category: 'Vegetable', weight: '1kg', image: require('../assets/apples.jpg') },
    //     { id: '4', name: 'Orange', price: 149, marketPrice: '1.99', subText: 'Source of Vitamin C', category: 'Fruit', weight: '1dozen', image: require('../assets/apples.jpg') },
    //     { id: '5', name: 'Broccoli', price: 129, marketPrice: '1.79', subText: 'Nutrient-rich', category: 'Vegetable', weight: '1kg', image: require('../assets/apples.jpg') },
    //     // Add more food items as needed
    // ];

    // Function to render individual food item
    const renderItem: ListRenderItem<IProduce> = ({ item }) => (
        <FoodCard item={item} />
    );

    if (loading) {
        return (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size={"large"} color={Colors.lightOrange} />
            </View>
        )
    }

    // Function to render category
    const renderCategory = (category: string) => (
        <View style={styles.categoryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, }}>
                <Text style={styles.categoryName}>{category}</Text>
                {/* <Text style={styles.seeAllStyle}>See All</Text> */}
            </View>
            <FlatList
                horizontal
                data={foodData.filter(food => food.category === category)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ marginHorizontal: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView style={styles.scrollView}>
                    {(!paymentSuccess && (status === "ACTIVE" || status === "SCHEDULED")) && (
                        <TouchableOpacity
                            style={styles.banner}
                            onPress={() => navigation.navigate('ScheduledScreen')}
                        >
                            <Text style={styles.bannerText}>
                                Pending Payment: Complete your payment before Saturday to avoid cancellation of your order or subscription. Click here to pay now.
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.searchContainer}>
                        <Icon style={{ marginHorizontal: 10 }} name="search" size={25} color={Colors.lightGrey} />
                        <Text style={styles.textStyle}>{"Search"}</Text>
                    </TouchableOpacity>
                    {renderCategory('Fruit')}
                    {renderCategory('Vegetable')}
                    {renderCategory('Dairy')}
                    {/* {renderCategory('Meat & Poultry')} */}
                    {renderCategory('Condiments')}
                    {renderCategory('Grains')}
                    {renderCategory('Beverages')}
                    {renderCategory('Snacks')}
                </ScrollView>

                <FloatingButton onPress={() => navigation.navigate("CartScreen")} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        // justifyContent: 'center',
        paddingTop: verticalScale(50),
        backgroundColor: 'white',
        paddingBottom: 25
    },
    scrollView: {

    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryName: {
        fontSize: moderateScale(18),
        marginBottom: 10,
        marginLeft: 10,
        fontFamily: Fonts.Family.Bold
    },
    seeAllStyle: {
        fontSize: moderateScale(14),
        marginBottom: 10,
        marginLeft: 10,
        fontFamily: Fonts.Family.Bold,
        alignSelf: 'flex-end',
        color: Colors.lightGrey
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    searchContainer: {
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 8,
        margin: 10,
        borderColor: Colors.lightGrey,
        flexDirection: 'row'
    },
    textStyle: {
        marginHorizontal: 5,
        flex: 1,
        fontFamily: Fonts.Family.SemiBold,
        textAlignVertical: 'center',
        color: 'grey'
    },
    banner: {
        backgroundColor: "orange", // Warning color
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 15
    },
    bannerText: {
        color: '#000',
        fontFamily: Fonts.Family.Bold,
        textAlign: 'center'
    },
});

export default HomeScreen
