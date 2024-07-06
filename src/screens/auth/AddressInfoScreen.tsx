import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FirebaseAuthError, FormErrors, RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, Alert, Keyboard } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import Fonts from "../../theme/typographic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/users/userSlices";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import { Firestore, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressInfoScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [postalCode, setPostalCode] = useState('');
    const [sector, setSector] = useState('');
    const [streetNo, setStreetNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const { name, email, password } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Inside Address Info Screen");
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
    const handlePress = useCallback(async () => {
        const isValid = validateForm()
        if (!isValid) {
            return
        }
        const address = {
            postalCode,
            sector,
            streetNo,
            houseNo,
        }
        setLoading(true)
        try {
            if (email && password) {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.trim(),
                    password
                )
                const user = userCredential.user
                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, {
                    email: user.email,
                    name,
                    phoneNo,
                    address
                });
                dispatch(
                    setUser({
                        name,
                        email,
                        uID: user.uid,
                        phoneNo,
                        address
                    })
                )
                // Alert.alert("User signedUp Successfully!");
                await AsyncStorage.setItem('userId', user.uid)
                navigation.dispatch(StackActions.replace('HomeStack'))
            }
        } catch (e) {
            console.log(e)
            const error = e as FirebaseAuthError
            switch (error.code) {
                case 'auth/email-already-in-use':
                    Alert.alert("That email address is already in use!")
                    break
                case 'auth/invalid-email':
                    break
                default:
                    Alert.alert("An unexpected error occured!")
            }
        } finally {
            setLoading(false)
        }

    }, [postalCode, sector, streetNo, houseNo, phoneNo])
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View >
                <Header top={verticalScale(-10)} />
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
                    // onSubmitEditing={()=>Keyboard.dismiss}
                    >
                    </TextInput>
                </View>
                <Button title="Sign-up" loading={loading} onPress={handlePress}>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: Colors.authBackground
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

export default AddressInfoScreen