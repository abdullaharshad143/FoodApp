import { View, StyleSheet, ScrollView, Text } from "react-native"
import React, { useEffect } from "react"
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

const CartScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    useEffect(() => {
        console.log("Inside Cart Screen")
    }, [])
    const cartItems = useSelector((state: RootState) => state.produce.items);
    const dispatch = useDispatch();
    const clearTheCart = () => {
        dispatch(clearCart());
    }
    return (
        <>
            {cartItems.length > 0 ? (
                <ScrollView style={styles.mainContainer}>
                    <Header text="Cart" top={40} />
                    <View style={styles.cartItemsContainer}>
                        <View style={{ alignItems: 'flex-end', marginHorizontal: 15 }}>
                            <SmallButton title="Clear Cart" onPress={clearTheCart} />
                        </View>
                        <Cart />
                    </View>
                    <View style={styles.paymentDetailsContainer}>
                        <PaymentDetails />
                    </View>
                    <View style={styles.buttonContiner}>
                        <SmallButton title="Checkout" onPress={() => navigation.navigate("SubscribeAndSaveScreen")}/>
                    </View>
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