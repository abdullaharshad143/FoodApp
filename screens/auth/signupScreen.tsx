import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import { FontAwesome as Icon } from "@expo/vector-icons";

const SignupScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const handlePress = useCallback(() => {

    }, [])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
             <Header/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>{'Create Account'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Name"
                    >
                    </TextInput>
                </View>
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Confirm Password"
                        secureTextEntry={confirmPasswordVisibility}
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
                <Button title="Next" onPress={handlePress}>

                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer:{
        flex:0.2,
    },
    contentContainer: {
        alignItems: 'center',
        flex:0.7
    },
    headingStyle: {
        fontSize: moderateScale(30),
        color: Colors.slateGrey,
        fontWeight: 'bold'
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
        flex:1
    },
    eyeIcon:{
        marginHorizontal:horizontalScale(10),
        paddingVertical: verticalScale(10)
    }
});

export default SignupScreen