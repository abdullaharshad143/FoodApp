import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../../theme/typographic";


const ForgotPasswordScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const handlePress = useCallback(() => {

    }, [])
    const handleCreateAccount = useCallback(() => {
        navigation.navigate("SignupScreen");
    }, [])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View >
             <Header/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>{'Forgot Password'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                    >
                    </TextInput>
                </View>
                <Button title="Send Email" onPress={handlePress}>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        alignItems: 'center',
        flex: 0.9,
        justifyContent:'center',
    },
    headingStyle: {
        fontSize: moderateScale(30),
        color: Colors.slateGrey,
        fontFamily: Fonts.Family.Bold
    },
    inputContainer: {
        width: '73%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.lightOrange,
        marginVertical: verticalScale(15),
        flexDirection:"row",
        justifyContent:'space-between'
    },
    inputStyle: {
        marginHorizontal: horizontalScale(5),
        paddingVertical: verticalScale(7),
        paddingHorizontal: horizontalScale(5),
        flex:1,
        fontFamily:Fonts.Family.SemiBold,
    },
    underlineText:{
        textDecorationLine:'underline',
    },
    termsContainer:{
        flex:0.15,
        justifyContent:'flex-end',
        alignItems:"center",
        marginBottom: verticalScale(5)
    },
    eyeIcon:{
        marginHorizontal:horizontalScale(10),
        paddingVertical: verticalScale(10)
    },
    termsText:{
        fontFamily:Fonts.Family.MediumItalic,
        color: Colors.slateGrey
    },
    forgotPasswordText:{
        fontFamily:Fonts.Family.SemiBold,
        color: Colors.slateGrey
    }
});

export default ForgotPasswordScreen