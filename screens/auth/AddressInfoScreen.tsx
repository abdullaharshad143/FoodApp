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

const AddressInfoScreen = ({
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
                <Text style={styles.headingStyle}>{'Address Info'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Name"
                        value="Islamabad"
                        editable={false}
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Postal Code"
                        keyboardType="number-pad"
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Sector"
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Street No"
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="House No"
                    >
                    </TextInput>
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
        justifyContent: 'space-around',
    },
    headerContainer:{
    },
    contentContainer: {
        alignItems: 'center',
        flex:0.8,
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
    }
});

export default AddressInfoScreen