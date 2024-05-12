import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { horizontalScale } from '../utils/responsive';
import Fonts from '../theme/typographic';
import { IProduce } from '../core/types';
import { FontAwesome as Icon } from "@expo/vector-icons";

const Cart: React.FC<{ item: IProduce }> = ({ item }) => {
    const [quantity, setQuantity] = useState(0);
    const [editQuantity, setEditQuantity] = useState(false);
    const handleAddQuantity = useCallback(() => {
        setEditQuantity(true)
        setQuantity(quantity + 1);
    }, [quantity])
    const handleLessQuantity = useCallback(() => {
        setEditQuantity(true)
        if (quantity <= 0) {
            return quantity
        }
        else {
            setQuantity(quantity - 1);
        }
    }, [quantity])
    const closeCounter = useCallback(() => {
        setEditQuantity(false)
    }, [editQuantity])

    // for testing
    const openCounter = useCallback(() => {
        setEditQuantity(true);
        if (quantity === 0) {
            setQuantity(quantity + 1)
        }
    }, [editQuantity])

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <>
                    <View style={styles.cardImage}>
                        <Image source={item.image} style={styles.cardImage} />
                    </View>
                    <Text style={styles.textOrdername}>{item.name}</Text>
                    <View style={styles.textmainView}>
                        <View style={styles.directionrowstle}>
                            <Text style={styles.textQtyPrice}>${item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.countView}>
                        <TouchableWithoutFeedback onPress={openCounter} onPressOut={closeCounter}>
                            <View style={styles.directionrowstle}>
                                {quantity > 0 && editQuantity ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleLessQuantity()
                                            }
                                            style={styles.button}
                                        >
                                            <Icon name='minus' size={15} color={"black"} />
                                        </TouchableOpacity>
                                        <Text style={styles.count}>{quantity}pc</Text>
                                        <TouchableOpacity
                                            onPress={() => handleAddQuantity()}
                                            style={styles.button}
                                        >
                                            <Icon name='plus' size={15} color={"black"} />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <Text style={styles.count}>{quantity}pc</Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </>
            </View>
        </View>
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