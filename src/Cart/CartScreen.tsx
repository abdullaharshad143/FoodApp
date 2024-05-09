import { Text, View, StyleSheet, ScrollView } from "react-native"
import { useEffect } from "react"
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive"
import { Colors } from "../theme/color"
import Fonts from "../theme/typographic"
import { IProduce, RootBottomParamList, RootStackParamList } from "../core/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import PaymentDetails from "../components/PaymentDetails"
import Header from "../components/Header"

const CartScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    useEffect(() => {
        console.log("Inside Cart Screen")
    }, [])

    return (
        <ScrollView style={styles.mainContainer}>
            <Header text="Cart" top={40} />
            <View style={styles.paymentDetailsContainer}>
                <PaymentDetails />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    paymentDetailsContainer: {
        padding: 40,
    }
});



export default CartScreen