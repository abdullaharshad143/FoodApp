import React from "react";
import {Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import { moderateScale, verticalScale } from "../utils/responsive";
import Fonts from "../theme/typographic";


interface ButtonProps {
    onPress : () => void;
    title: string
    loading?: boolean
}

const Button: React.FC<ButtonProps> = ({onPress, title, loading}) => {
    return(
        <TouchableOpacity
        style={[styles.buttonStyle]}
        onPress={onPress}
        disabled={loading}
    >
        {loading ? (
            <ActivityIndicator size="small" color="#DFAB01" />
        ) : (
            <Text style={styles.textStyle}>{title}</Text>
        )}
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:'#FDF4E4',
        width:'73%',
        paddingVertical: verticalScale(12),
        borderRadius:10,
        borderColor: '#DFAB01',
        borderWidth:1,
        marginVertical: verticalScale(15)

    },
    textStyle:{
        textAlign:'center',
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(16)
    }
})

export default Button;