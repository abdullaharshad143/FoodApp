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
import { useDispatch } from "react-redux"
import { setUser } from "../redux/users/userSlices"
import { useFocusEffect } from "@react-navigation/native"
import { FontAwesome as Icon } from "@expo/vector-icons";

const HomeScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [loading, setLoading] = useState(false)
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
            const userId = await AsyncStorage.getItem('userId');
            const userDocRef = doc(db, "users", userId || "");
            const userDocSnapShot = await getDoc(userDocRef);

            if (userDocSnapShot.exists()) {
                const { status } = userDocSnapShot.data();
                if (status === "ACTIVE" || status === "SCHEDULED") {
                    let orderedItems: IProduce[] = []; // Initialize orderedItems array

                    if (status === "ACTIVE") {
                        const oneTimeRef = collection(db, "subscription");
                        const snapshot = await getDocs(oneTimeRef);
                        orderedItems = snapshot.docs
                            .map(doc => doc.data().orderedItems)
                            .flat();
                    } else if (status === "SCHEDULED") {
                        const subscriptionRef = collection(db, "oneTime");
                        const snapshot = await getDocs(subscriptionRef);
                        orderedItems = snapshot.docs
                            .map(doc => doc.data().orderedItems)
                            .flat();
                    }
                    dispatch(
                        setUser({
                            status: status
                        })
                    )
                    //@ts-ignore
                    dispatch(setItems(orderedItems));
                }
                if (!status) {
                    dispatch(
                        setUser({
                            status: ""
                        })
                    )
                }
            }
        } catch (error) {
            console.error("Error getting user document:", error);
            // Handle error as needed
        }
        finally {
            setLoading(false)
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
                    <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.searchContainer}>
                        <Icon style={{ marginHorizontal: 10 }} name="search" size={25} color={Colors.lightGrey} />
                        <Text style={styles.textStyle}>{"Search"}</Text>
                    </TouchableOpacity>
                    {renderCategory('Fruit')}
                    {renderCategory('Vegetable')}
                    {renderCategory('Dairy')}
                    {renderCategory('Meat & Poultry')}
                    {renderCategory('Seafood')}
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
    }
});

export default HomeScreen