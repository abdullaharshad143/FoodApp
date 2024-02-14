import React from "react";
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import { verticalScale } from "../utils/responsive";


interface ButtonProps {
    onPress : () => void;
    title: string
}

const Button: React.FC<ButtonProps> = ({onPress, title}) => {
    return(
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
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
        textAlign:'center'
    }
})

export default Button;