import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { horizontalScale, verticalScale } from "../utils/responsive"
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../theme/typographic";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomParamList, RootStackParamList } from "../core/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface FloatingButtonProps {
    onPress?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    const totalPrice = useSelector((state: RootState) => state.produce.totalPrice);
    return (
        <TouchableOpacity onPress={onPress} style={styles.mainCointainer}>
            <Icon name="shopping-cart" size={22} color={"black"} />
            <Text style={styles.textStyle}>Rs {totalPrice}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    mainCointainer: {
        flex: 1,
        backgroundColor: "orange",
        zIndex: 1,
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        padding: 15,
        flexDirection: 'row',
    },
    textStyle: {
        marginLeft: horizontalScale(5),
        fontFamily: Fonts.Family.Bold,
        fontSize: 17
    }
})
export default FloatingButton