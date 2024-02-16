import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FormErrors, RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../../theme/typographic";

const SignupScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);

    const resetState = () => {
        setEmail('')
        setName('')
        setPassword('')
        setConfirmPassword('')
        setErrors({})
        setLoading(false)
    }

    const validateForm = ()=>{
        let validationErrors: FormErrors = {}
        if(!name){
            validationErrors.name = '*Name is required'
        }
        if(!email){
            validationErrors.email = '*Email is required'
        }
        if(!password){
            validationErrors.password = '*Password is required'
        }
        else if (password.length < 6){
            validationErrors.password = '*Password must be at least 6 characters long'
        }
        if(confirmPassword !== password){
            validationErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0
    }

    const handlePress = useCallback(() => {
        const isValid = validateForm()
        if(isValid)
        navigation.navigate('AddressInfoScreen')
    }, [name, email, password, confirmPassword])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
             <Header/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>{'Create Account'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    >
                    </TextInput>
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    >
                    </TextInput>
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        secureTextEntry={passwordVisibility}
                        value={password}
                        onChangeText={setPassword}
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
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Confirm Password"
                        secureTextEntry={confirmPasswordVisibility}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    >
                    </TextInput>
                    {confirmPasswordVisibility ?
                        <Icon 
                        style= {styles.eyeIcon}
                        name = "eye-slash" size={20} color={"black"}
                        onPress={()=>setConfirmPasswordVisibility(false)}
                        />
                        :
                        <Icon 
                        style= {styles.eyeIcon}
                        name = "eye" size={20} color={"black"}
                        onPress={()=>setConfirmPasswordVisibility(true)}
                        />
                        }
                </View>
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                <Button title="Next" onPress={handlePress}>

                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    contentContainer: {
        alignItems: 'center',
        flex:0.75,
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
        flexDirection:'row',
        justifyContent:"space-between"
    },
    inputStyle: {
        marginHorizontal: horizontalScale(5),
        paddingVertical: verticalScale(7),
        paddingHorizontal: horizontalScale(5),
        flex:1,
        fontFamily:Fonts.Family.SemiBold,
    },
    eyeIcon:{
        marginHorizontal:horizontalScale(10),
        paddingVertical: verticalScale(10)
    },
    errorText:{
        width:'73%',
        color: Colors.error,
        fontFamily:Fonts.Family.MediumItalic
    }
});

export default SignupScreen