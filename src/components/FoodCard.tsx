// FoodCard.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/responsive';
import { Colors } from '../theme/color';
import Fonts from '../theme/typographic';
import { IProduce } from '../core/types';

const FoodCard: React.FC<{ item: IProduce }> = ({ item }) => {
    return (
        <View style={styles.foodCard}>
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
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: horizontalScale(150),
        height: verticalScale(220)
    },
    foodImage: {
        width: '100%',
        borderRadius: 8,
        height: verticalScale(140)
    },
    foodDetails: {
        flex: 1,
        marginLeft: 10,
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
        marginTop: 10,
    },
    foodMarketPrice: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Family.Bold,
        marginTop: 10,
        marginHorizontal: horizontalScale(10),
        color: Colors.slateGrey,
        textDecorationLine: 'line-through'
    }
});

export default FoodCard;
