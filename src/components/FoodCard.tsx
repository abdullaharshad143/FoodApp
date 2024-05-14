import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/responsive';
import { Colors } from '../theme/color';
import Fonts from '../theme/typographic';
import { IProduce } from '../core/types';
import { FontAwesome as Icon } from "@expo/vector-icons";
import { addItem, increaseQuantity, decreaseQuantity, removeItem } from '../redux/cart/cartSlices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FoodCard: React.FC<{ item: IProduce }> = ({ item }) => {
    const dispatch = useDispatch(); // Initialize useDispatch hook
    const cartItems = useSelector((state: RootState) => state.produce.items);
    const cartItem = cartItems.find((cartItem: { id: string; }) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const [editQuantity, setEditQuantity] = useState(false);
    const handleAddQuantity = useCallback(() => {
        setEditQuantity(true)
        const itemInCart = cartItems.find((cartItem: { id: string; }) => cartItem.id === item.id);
        if (itemInCart) {
            dispatch(increaseQuantity(item.id));
        } else {
            dispatch(addItem(item));
        }
    }, [quantity, dispatch, cartItems, item])
    const handleSubtractQuantity = useCallback(() => {
        setEditQuantity(true)
        if (item.quantity === 1) {
            dispatch(removeItem(item.id));
        } else {
            dispatch(decreaseQuantity(item.id));
        }
        if (quantity <= 0) {
            return quantity
        }
    }, [quantity, dispatch, cartItems, item])
    const closeCounter = useCallback(() => {
        setEditQuantity(false)
    }, [editQuantity])
    return (
        <View style={styles.foodCard}>
            {quantity > 0 && editQuantity ? (
                <TouchableWithoutFeedback onPressOut={closeCounter}>
                    <View style={styles.counterContainer}>
                        <TouchableOpacity style={styles.counterButton} onPress={handleSubtractQuantity}>
                            <Icon name='minus' size={20} color={"white"} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}pc</Text>
                        <TouchableOpacity style={styles.counterButton} onPress={handleAddQuantity}>
                            <Icon name='plus' size={20} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.plusButton}>
                    {quantity > 0 ? (
                        <View style={styles.counterButton}>
                            <Text style={styles.quantityText} onPress={() => setEditQuantity(true)}>{quantity}pc</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.counterButton} onPress={handleAddQuantity}>
                            <Icon name='plus' size={20} color={"white"} />
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <Image source={item.image} style={styles.foodImage} />
            <View style={styles.foodDetails}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.foodPrice}>{item.price}</Text>
                    <Text style={styles.foodMarketPrice}>{item.marketPrice}</Text>
                </View>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodSubText}>{item.subText}</Text>
                {/* Add more details if needed */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    foodCard: {
        backgroundColor: Colors.authBackground,
        borderRadius: 8,
        marginHorizontal: 10,
        width: horizontalScale(150),
        height: verticalScale(220),
    },
    foodImage: {
        width: '100%',
        borderRadius: 8,
        height: verticalScale(140)
    },
    foodDetails: {
        flex: 1,
        marginLeft: horizontalScale(10),
    },
    foodName: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Family.SemiBold
    },
    foodSubText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.Family.SemiBold,
        color: Colors.slateGrey
    },
    foodPrice: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Family.Bold,
        marginTop: verticalScale(10),
    },
    foodMarketPrice: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Family.Bold,
        marginTop: verticalScale(10),
        marginHorizontal: horizontalScale(10),
        color: Colors.slateGrey,
        textDecorationLine: 'line-through'
    },
    counterContainer: {
        position: 'absolute',
        backgroundColor: 'orange',
        padding: 3,
        // paddingHorizontal:50,
        zIndex: 100,
        borderRadius: 15,
        right: 10,
        // alignSelf: 'center',
        top: 10,
        flexDirection: 'row',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    quantityText: {
        marginHorizontal: horizontalScale(5),
        fontFamily: Fonts.Family.Bold,
        color: 'white',
        fontSize: moderateScale(16),

    },
    counterButton: {
        marginHorizontal: horizontalScale(5),
        padding: 5,
        borderRadius: 15,
    },
    plusButton: {
        position: 'absolute',
        backgroundColor: 'orange',
        padding: 2,
        // paddingHorizontal:50,
        zIndex: 100,
        borderRadius: 25,
        right: 10,
        // alignSelf: 'center',
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default FoodCard;
