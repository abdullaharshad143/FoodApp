import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { horizontalScale } from '../utils/responsive';
import Fonts from '../theme/typographic';
import { FontAwesome as Icon } from "@expo/vector-icons";
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { IProduce } from '../core/types';
import { increaseQuantity, addItem, removeItem, decreaseQuantity } from '../redux/cart/cartSlices';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.produce.items);
    const dispatch = useDispatch();
    const [editQuantity, setEditQuantity] = useState(false);

    const handleAddQuantity = useCallback((item: IProduce) => {
        const itemInCart = cartItems.find((cartItem: { id: string; }) => cartItem.id === item.id);
        if (itemInCart) {
            dispatch(increaseQuantity(item.id));
        } else {
            dispatch(addItem(item));
        }
    }, [cartItems, dispatch]);

    const handleSubtractQuantity = useCallback((item: IProduce) => {
        const itemInCart = cartItems.find((cartItem: { id: string; }) => cartItem.id === item.id);
        if (itemInCart && itemInCart.quantity === 1) {
            dispatch(removeItem(item.id));
        } else {
            dispatch(decreaseQuantity(item.id));
        }
    }, [cartItems, dispatch]);

    const renderItem = ({ item }: { item: IProduce }) => {
        const quantity = item.quantity || 0;
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImage}>
                        <Image source={item.image} style={styles.cardImage} />
                    </View>
                    <Text style={styles.textOrdername}>{item.name}</Text>
                    <View style={styles.textmainView}>
                        <View style={styles.directionrowstle}>
                            <Text style={styles.textQtyPrice}>Rs {item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.countView}>
                        <TouchableWithoutFeedback onPressOut={() => setEditQuantity(false)}>
                            <View style={styles.directionrowstle}>
                                {quantity > 0 && editQuantity ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleSubtractQuantity(item)}
                                            style={styles.button}
                                        >
                                            <Icon name='minus' size={15} color={"black"} />
                                        </TouchableOpacity>
                                        <Text style={styles.count}>{quantity}pc</Text>
                                        <TouchableOpacity
                                            onPress={() => handleAddQuantity(item)}
                                            style={styles.button}
                                        >
                                            <Icon name='plus' size={15} color={"black"} />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <Text style={styles.count} onPress={() => setEditQuantity(true)}>{quantity}pc</Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{}}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F5',
        margin: 10,
    },
    cardContainer: {
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 20
    },
    button: {
        padding: 7,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        marginHorizontal: horizontalScale(10),
        alignSelf: 'center',
        fontFamily: Fonts.Family.SemiBold,
    },
    directionrowstle: {
        flexDirection: 'row',
    },
    textmainView: {
        flex: 0.3,
        justifyContent: 'center',
        paddingLeft: horizontalScale(10),
    },
    countView: {
        justifyContent: 'center',
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        right: 80,
        top: 30,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center'
    },
    textQtyPrice: {
        lineHeight: 24,
        fontFamily: Fonts.Family.SemiBold,
    },
    textOrdername: {
        lineHeight: 24,
        fontFamily: Fonts.Family.SemiBold,
        textAlignVertical: 'center',
        marginRight: horizontalScale(50)
    },
})

export default Cart;
