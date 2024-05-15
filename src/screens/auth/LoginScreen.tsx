import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FirebaseAuthError, FormErrors, RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Keyboard } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../../theme/typographic";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import { Firestore, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/users/userSlices";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const dispatch = useDispatch();
    const resetState = () => {
        setEmail('')
        setPassword('')
        setLoading(false)
        setErrors({})
    }
    useEffect(() => {
        console.log("Inside Login Screen");
    }, [])
    let validationErrors: FormErrors = {}
    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            validationErrors.email = '*Email is required'
        } else if (!emailRegex.test(email.trim())) {
            validationErrors.email = '*Invalid Email Address'
        }
        if (!password)
            validationErrors.password = '*Password is required'
        else if (password.length < 6)
            validationErrors.password = 'Password must be atleast 6 characters long'

        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0
    }

    const handleLogin = useCallback(() => {
        Keyboard.dismiss();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    const userDocSnapShot = await getDoc(userDocRef);
                    if (userDocSnapShot.exists()) {
                        const { name, email, phoneNo, address } = userDocSnapShot.data();
                        dispatch(
                            setUser({
                                name,
                                email,
                                phoneNo,
                                address,
                                uID: user.uid
                            }));
                        // Alert.alert("Login successfull")
                        await AsyncStorage.setItem('userId', user.uid)
                        navigation.dispatch(StackActions.replace('HomeStack'))
                    }
                } catch (error) {
                    // Handle Firestore document retrieval error
                    console.error("Error getting user document:", error);
                }
            })
            .catch((e) => {
                console.log(e)
                const error = e as FirebaseAuthError
                switch (error.code) {
                    case 'auth/invalid-email':
                        validationErrors.email = 'Invalid email address'
                        break
                    case 'auth/invalid-credential':
                        validationErrors.email = 'Wrong password or email'
                        break
                    case 'auth/user-not-found':
                        validationErrors.email = 'Account not found!'
                }

            })
            .finally(() => {
                setLoading(false);
            });
    }, [email, password]);

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
                            style={styles.eyeIcon}
                            name="eye-slash" size={20} color={"black"}
                            onPress={() => setPasswordVisibility(false)}
                        />
                        :
                        <Icon
                            style={styles.eyeIcon}
                            name="eye" size={20} color={"black"}
                            onPress={() => setPasswordVisibility(true)}
                        />
                    }
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <Button title="Sign in" onPress={handleLogin} loading={loading}>
                </Button>
                <Button title="Create Account" onPress={handleCreateAccount}>
                </Button>
                <TouchableOpacity onPress={() => { navigation.navigate('ForgotPasswordScreen') }}>
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
        justifyContent: 'center',
        backgroundColor: Colors.authBackground
    },
    contentContainer: {
        alignItems: 'center',
        flex: 0.9,
        justifyContent: 'center',
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
    underlineText: {
        textDecorationLine: 'underline',
    },
    termsContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        alignItems: "center",
        marginBottom: verticalScale(5)
    },
    eyeIcon: {
        marginHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(10)
    },
    termsText: {
        fontFamily: Fonts.Family.MediumItalic,
        color: Colors.slateGrey
    },
    forgotPasswordText: {
        fontFamily: Fonts.Family.SemiBold,
        color: Colors.slateGrey
    },
    errorText: {
        width: '73%',
        color: Colors.error,
        fontFamily: Fonts.Family.MediumItalic
    }
});

export default LoginScreen