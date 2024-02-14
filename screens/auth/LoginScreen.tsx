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


const LoginScreen = ({
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
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>Login</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        secureTextEntry={passwordVisibility}
                    >
                    </TextInput>
                    {passwordVisibility ?
                        <Icon 
                        style= {styles.eyeIcon}
                        name = "eye-slash" size={20} color={"black"}
                        onPress={()=>setPasswordVisibility(false)}
                        />
                        :
                        <Icon 
                        style= {styles.eyeIcon}
                        name = "eye" size={20} color={"black"}
                        onPress={()=>setPasswordVisibility(true)}
                        />
                        }
                </View>
                <Button title="Sign in" onPress={handlePress}>
                </Button>
                <Button title="Create Account" onPress={handleCreateAccount}>
                </Button>
                <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
                <Text style={styles.forgotPasswordText}>{'Forgot Password?'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>{'You are agreeing to our '}
                    <Text style={styles.underlineText}>terms and conditions</Text>
                </Text>
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
        flex: 0.85,
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
        fontFamily:Fonts.Family.BoldItalic,
        color: Colors.slateGrey
    },
    forgotPasswordText:{
        fontFamily:Fonts.Family.SemiBold,
        color: Colors.slateGrey
    }
});

export default LoginScreen