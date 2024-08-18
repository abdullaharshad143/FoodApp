import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { FormErrors, RootStackParamList } from "../core/types";
import { Text, StyleSheet, TextInput, SafeAreaView, View, Alert, KeyboardAvoidingView } from "react-native";
import Header from "../components/Header";
import Fonts from "../theme/typographic";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { Colors } from "../theme/color";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Firestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setUser } from "../redux/users/userSlices";


const EditAddressInfoScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {

    const data = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const [postalCode, setPostalCode] = useState(data.address.postalCode);
    const [sector, setSector] = useState(data.address.sector);
    const [streetNo, setStreetNo] = useState(data.address.streetNo);
    const [houseNo, setHouseNo] = useState(data.address.houseNo);
    const [phoneNo, setPhoneNo] = useState(data.phoneNo);
    const [note, setNote] = useState(data.address.note);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("Inside Edit Address Info Screen");
    }, [])
    const validateForm = () => {
        const phoneNoRegEx = /^(\+92|92|0)?[345678]\d{9}$/
        let validationErrors: FormErrors = {}
        if (!postalCode)
            validationErrors.postalCode = '*Postal Code is required'
        if (!sector)
            validationErrors.sector = '*Sector is required'
        if (!streetNo)
            validationErrors.streetNo = '*Street No is required'
        if (!houseNo)
            validationErrors.houseNo = '*House No is required'
        if (!phoneNo) {
            validationErrors.phoneNumber = '*Phone No is required'
        } else if (!phoneNoRegEx.test(phoneNo.trim())) {
            validationErrors.phoneNumber = '*Invalid Phone Number'
            Alert.alert("Phone Number is invalid\ncorrect format is 03001234567")
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0
    }
    const updateUser = useCallback(async () => {
        try {
            const isValid = validateForm()
            if (!isValid) {
                return
            }
            setLoading(true);
            const userRef = doc(db, "users", data.uID);
            const userDocSnapShot = await getDoc(userRef);
            if (userDocSnapShot.exists()) {
                await updateDoc(userRef, {
                    address: {
                        houseNo,
                        postalCode,
                        sector,
                        streetNo,
                        note,
                    }
                });
                dispatch(
                    setUser({
                        address: {
                            houseNo,
                            postalCode,
                            sector,
                            streetNo,
                            note,
                        }
                    }));
                Alert.alert("Address Updated!")
                console.log('Address data updated successfully!');
                navigation.goBack();
            } else {
                console.log('User document does not exist.');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setLoading(false)
        }
    }, [streetNo, postalCode, sector, note, phoneNo])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View >
                <Header top={verticalScale(20)} />
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
                <View style={styles.flexStyle}>
                    <View style={[styles.inputContainer, styles.smallInputsContainer]}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Postal Code"
                            keyboardType="number-pad"
                            value={postalCode}
                            onChangeText={setPostalCode}
                        >
                        </TextInput>
                    </View>
                    <View style={[styles.inputContainer, styles.smallInputsContainer]}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Sector"
                            value={sector}
                            onChangeText={setSector}
                        >
                        </TextInput>
                    </View>
                </View>
                {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
                {errors.sector && <Text style={styles.errorText}>{errors.sector}</Text>}
                <View style={styles.flexStyle}>
                    <View style={[styles.inputContainer, styles.smallInputsContainer]}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Street No"
                            value={streetNo}
                            onChangeText={setStreetNo}
                        >
                        </TextInput>
                    </View>
                    <View style={[styles.inputContainer, styles.smallInputsContainer]}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="House No"
                            value={houseNo}
                            onChangeText={setHouseNo}
                        >
                        </TextInput>
                    </View>
                </View>
                {errors.streetNo && <Text style={styles.errorText}>{errors.streetNo}</Text>}
                {errors.houseNo && <Text style={styles.errorText}>{errors.houseNo}</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Phone No"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                    >
                    </TextInput>
                </View>
                {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Delivery Note (optional)"
                        value={note}
                        onChangeText={setNote}
                        multiline={true}
                        numberOfLines={3}
                    >
                    </TextInput>
                </View>
                <Button title="Save Changes" loading={loading} onPress={updateUser}>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor:'white'
    },
    contentContainer: {
        alignItems: 'center',
        flex: 0.8,
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
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    inputStyle: {
        marginHorizontal: horizontalScale(5),
        paddingVertical: verticalScale(7),
        paddingHorizontal: horizontalScale(5),
        flex: 1,
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16)
    },
    flexStyle: {
        flexDirection: 'row'
    },
    smallInputsContainer: {
        width: '34%',
        marginHorizontal: 10
    },
    errorText: {
        width: '73%',
        color: Colors.error,
        fontFamily: Fonts.Family.MediumItalic
    }
});
export default EditAddressInfoScreen;