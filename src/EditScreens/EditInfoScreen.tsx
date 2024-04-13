import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../core/types";
import { Text, StyleSheet, TextInput, SafeAreaView, View, Alert } from "react-native";
import Header from "../components/Header";
import Fonts from "../theme/typographic";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { Colors } from "../theme/color";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Firestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setUser } from "../redux/users/userSlices";


const EditInfoScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const data = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const [name, setName] = useState(data.name);
    const [phoneNo, setPhoneNo] = useState(data.phoneNo);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log("Inside Edit Info Screen");
    }, [])

    const updateUser = useCallback(async () => {
        try {
            setLoading(true);
            const userRef = doc(db, "users", data.uID);
            const userDocSnapShot = await getDoc(userRef);
            if (userDocSnapShot.exists()) {
                await updateDoc(userRef, {
                    name: name,
                    phoneNo: phoneNo
                });
                dispatch(
                    setUser({
                        name,
                        phoneNo,
                    }));
                Alert.alert("Profile Updated!")
                console.log('User data updated successfully!');
                navigation.goBack();
            } else {
                console.log('User document does not exist.');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setLoading(false)
        }
    }, [name, phoneNo])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header top={45} />
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>{'Edit Info'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        value={name}
                        onChangeText={setName}
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        keyboardType="number-pad"
                    >
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={data.email}
                        editable={false}
                    >
                    </TextInput>
                </View>
                <Text style={styles.textStyle}>{"To change email, please contact the FoodApp Team"}</Text>
                <Button title="Change My Password" />
                <Button title="Save Changes" onPress={updateUser} loading={loading} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    headingStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(30),
        color: Colors.slateGrey
    },
    contentContainer: {
        alignItems: 'center'
    },
    inputContainer: {
        width: '73%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.lightOrange,
        marginVertical: verticalScale(15),
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    inputStyle: {
        marginHorizontal: horizontalScale(5),
        paddingVertical: verticalScale(7),
        paddingHorizontal: horizontalScale(5),
        flex: 1,
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16)
    },
    textStyle: {
        fontFamily: Fonts.Family.MediumItalic,
        fontSize: moderateScale(10)
    }
});

export default EditInfoScreen;