import { View, StyleSheet, ScrollView, ListRenderItem, FlatList } from "react-native"
import { useEffect } from "react"
import { verticalScale } from "../utils/responsive"
import { IProduce, RootBottomParamList, } from "../core/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import PaymentDetails from "../components/PaymentDetails"
import Header from "../components/Header"
import Cart from "../components/Cart"
import SmallButton from "../components/SmallButton"

const CartScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    useEffect(() => {
        console.log("Inside Cart Screen")
    }, [])
    const foodData: IProduce[] = [
        { id: '1', name: 'Apple', price: '1.99', marketPrice: '$2.49', subText: 'Fresh and juicy', category: 'Fruit', weight: '0.5kg', image: require('../assets/apples.jpg') },
        { id: '2', name: 'Banana', price: '0.99', marketPrice: '$1.29', subText: 'Rich in potassium', category: 'Fruit', weight: '0.3kg', image: require('../assets/apples.jpg') },
        { id: '3', name: 'Carrot', price: '0.79', marketPrice: '$0.99', subText: 'High in Vitamin A', category: 'Vegetable', weight: '0.2kg', image: require('../assets/apples.jpg') },
        { id: '4', name: 'Orange', price: '1.49', marketPrice: '$1.99', subText: 'Source of Vitamin C', category: 'Fruit', weight: '0.4kg', image: require('../assets/apples.jpg') },
        { id: '5', name: 'Broccoli', price: '1.29', marketPrice: '$1.79', subText: 'Nutrient-rich', category: 'Vegetable', weight: '0.3kg', image: require('../assets/apples.jpg') },
        { id: '6', name: 'Apple', price: '1.99', marketPrice: '$2.49', subText: 'Fresh and juicy', category: 'Fruit', weight: '0.5kg', image: require('../assets/apples.jpg') },
        { id: '7', name: 'Banana', price: '0.99', marketPrice: '$1.29', subText: 'Rich in potassium', category: 'Fruit', weight: '0.3kg', image: require('../assets/apples.jpg') },
        { id: '8', name: 'Carrot', price: '0.79', marketPrice: '$0.99', subText: 'High in Vitamin A', category: 'Vegetable', weight: '0.2kg', image: require('../assets/apples.jpg') },
        { id: '9', name: 'Orange', price: '1.49', marketPrice: '$1.99', subText: 'Source of Vitamin C', category: 'Fruit', weight: '0.4kg', image: require('../assets/apples.jpg') },
        { id: '10', name: 'Broccoli', price: '1.29', marketPrice: '$1.79', subText: 'Nutrient-rich', category: 'Vegetable', weight: '0.3kg', image: require('../assets/apples.jpg') },
        // Add more food items as needed
    ];

    const renderItem: ListRenderItem<IProduce> = ({ item }) => (
        <Cart item={item} />
    );

    const renderCart = () => {
        return (
            <FlatList
                data={foodData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{}}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <Header text="Cart" top={40} />
            <View style={styles.cartItemsContainer}>
                {renderCart()}
            </View>
            <View style={styles.paymentDetailsContainer}>
                <PaymentDetails />
            </View>
            <View style={styles.buttonContiner}>
                <SmallButton title="Checkout" onPress={() => alert("OK")} />
            </View>
        </ScrollView>
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
    }
});



export default CartScreen