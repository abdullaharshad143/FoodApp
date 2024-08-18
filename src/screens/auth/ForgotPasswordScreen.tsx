import React, { useState, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../core/types";
import { View, Text, TextInput, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Colors } from "../../theme/color";
import Header from "../../components/Header";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/responsive";
import Button from "../../components/Button";
import Fonts from "../../theme/typographic";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgotPasswordScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false)

    const handlePress = useCallback(async () => {
        setLoading(true)

        try {
            if (email.trim() === '') {
                Alert.alert('Error', 'Please enter your email address.');
                return;
            }

            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
            navigation.goBack();
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'No account found with this email address.');
            }
            else if (error.code === 'auth/invalid-email') {
                Alert.alert("PLease enter valid email!")
            } else {
                Alert.alert('Error', 'Failed to send password reset email. Please try again.');
            }
            console.error("Error sending password reset email:", error);
        } finally {
            setLoading(false)
        }
    }, [email, navigation]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Header top={10} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.headingStyle}>{'Forgot Password'}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <Button loading={loading} title="Send Email" onPress={handlePress} />
            </View>
        </SafeAreaView>
    );
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
    },
});

export default ForgotPasswordScreen;
