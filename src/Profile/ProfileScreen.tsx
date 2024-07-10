import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native"
import Header from "../components/Header"
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive"
import Fonts from "../theme/typographic"
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import SmallButton from "../components/SmallButton";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../core/types";
import { useCallback, useEffect, useState } from "react";
import { clearUser, clearAddress, setUser } from "../redux/users/userSlices";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { deleteUser, getAuth } from "firebase/auth";
import { clearCart } from "../redux/cart/cartSlices";
const ProfileScreen = ({
    navigation
}: NativeStackScreenProps<RootStackParamList>) => {
    const data = useSelector((state: any) => state.user)
    const status = data.status
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("Inside Profile Screen");
    }, [])
    const logout = useCallback(() => async () => {
        setLoading(true);
        dispatch(clearUser());
        dispatch(clearAddress());
        dispatch(clearCart());
        await AsyncStorage.clear()
        navigation.dispatch(StackActions.replace("AuthStack"))
        setLoading(false);
    }, [])

    const updateSubscriptionStatus = useCallback(async (status: string) => {
        let msg;
        switch (status) {
            case "ACTIVE":
                msg = "Are you sure you want to Activate the subscription?";
                break;
            case "PAUSE":
                msg = "Are you sure you want to Pause the subscription?";
                break;
            default:
                msg = "Are you sure you want to Cancel the subscription?";
                break;
        }
        Alert.alert(
            "Confirm",
            msg,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Action cancelled"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setLoading(true)
                        const userId = await AsyncStorage.getItem('userId');
                        if (!userId) {
                            console.error("User ID not found");
                            setLoading(false);
                            return;
                        }

                        const userDocRef = doc(db, "users", userId);
                        const userDoc = await getDoc(userDocRef);

                        if (userDoc.exists()) {
                            await updateDoc(userDocRef, {
                                status: status,
                            });
                            const userData = userDoc.data();
                            const orderId = userData.orderId;

                            if (!orderId) {
                                console.error("Order ID not found in user document");
                                setLoading(false);
                                return;
                            }

                            const subscriptionDocRef = doc(db, "subscription", orderId);
                            const subscriptionDoc = await getDoc(subscriptionDocRef);

                            if (subscriptionDoc.exists()) {
                                await updateDoc(subscriptionDocRef, {
                                    status: status,
                                });
                                dispatch(setUser({ status: status }));
                                setLoading(false)
                                alert("Subscription Updated!");
                                console.log(`Subscription status updated to ${status}`);
                            }
                        } else {
                            console.error("User document not found");
                        }
                    }
                }
            ]
        );
    }, []);

    const deleteAccount = useCallback(async () => {
        Alert.alert(
            "Confirm Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Delete cancelled"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setLoading(true);
                        const userId = await AsyncStorage.getItem('userId');
                        if (!userId) {
                            console.error("User ID not found");
                            setLoading(false);
                            return;
                        }

                        try {
                            const userDocRef = doc(db, "users", userId);
                            const userDoc = await getDoc(userDocRef);

                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                const orderId = userData.orderId;

                                if (orderId) {
                                    if (userData.status === "SCHEDULED") {
                                        const oneTimeDocRef = doc(db, "oneTime", orderId);
                                        await deleteDoc(oneTimeDocRef);
                                    } else if (userData.status === "ACTIVE") {
                                        const subscriptionDocRef = doc(db, "subscription", orderId);
                                        await deleteDoc(subscriptionDocRef);
                                    }
                                }

                                await deleteDoc(userDocRef);

                                const auth = getAuth();
                                const user = auth.currentUser;
                                if (user) {
                                    await deleteUser(user);
                                }

                                await AsyncStorage.clear();
                                dispatch(clearUser());
                                dispatch(clearAddress());
                                alert("Account Deleted!");
                                navigation.dispatch(StackActions.replace("AuthStack"));
                            } else {
                                console.error("User document not found");
                            }
                        } catch (error) {
                            console.error("Error deleting account: ", error);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }, [dispatch, navigation]);

    return (
        <ScrollView style={styles.mainContainer}>
            <View>
                <Header top={50} text={`Hi ${data.name} !`} />
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>{"Personal"}</Text>
            </View>
            <View style={styles.flexStyle}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name="user-o" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.infoStyle}>{data.name}</Text>
                    <Text style={styles.infoStyle}>{data.email}</Text>
                    <Text style={styles.infoStyle}>{data.phoneNo}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditInfoScreen")}>
                    <Icon name="pencil" size={13} color={"black"} />
                </TouchableOpacity>

            </View>
            <View style={[styles.headingContainer, { marginTop: verticalScale(30) }]}>
                <Text style={styles.headingStyle}>{"Address"}</Text>
            </View>
            <View style={styles.flexStyle}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name="home" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.infoStyle}>House # {data.address.houseNo}</Text>
                    <Text style={styles.infoStyle}>Street # {data.address.streetNo}</Text>
                    <Text style={styles.infoStyle}>Sector {data.address.sector}</Text>
                    <Text style={styles.infoStyle}>Postal Code {data.address.postalCode}</Text>
                    <Text style={styles.infoStyle}>{data.address.note}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditAddressInfoScreen")}>
                        <Icon name="pencil" size={13} color={"black"} />
                    </TouchableOpacity>
                </View>

            </View>

            {/* <View style={[styles.headingContainer, { marginTop: verticalScale(30) }]}>
                <Text style={styles.headingStyle}>{"Payment Card"}</Text>
            </View>
            <View style={styles.flexStyle}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name="credit-card" size={20} color={"black"} />
                </View>
                <View>
                    <Text style={styles.infoStyle}>Card Ending in</Text>
                    <Text style={styles.infoStyle}>1111</Text>
                    <Text style={styles.infoStyle}>Default Card</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("PaymentCardScreen")}>
                        <Icon name="pencil" size={13} color={"black"} />
                    </TouchableOpacity>
                </View>

            </View> */}

            <View style={[styles.headingContainer, { marginTop: verticalScale(30) }]}>
                <Text style={styles.headingStyle}>{"Delivery"}</Text>
            </View>
            <View style={styles.flexStyle}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name="truck" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.infoStyle}>{"Available on Tuesdays"}</Text>
                </View>

            </View>
            {loading ? (
                <View style={{ marginTop: 50, alignSelf: 'center' }}>
                    <ActivityIndicator size={'large'} color={Colors.lightOrange} />
                </View>
            ) : (
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    {status === "PAUSE" && (
                        <SmallButton title="Activate Subscription" onPress={() => updateSubscriptionStatus("ACTIVE")} />
                    )}
                    {status === "ACTIVE" && (
                        <SmallButton title="Pause Subscription" onPress={() => updateSubscriptionStatus("PAUSE")} />
                    )}
                    {status === "SCHEDULED" && (
                        <SmallButton title="Cancel Order" onPress={() => updateSubscriptionStatus("CANCELLED")} />
                    )}
                    {status === "ACTIVE" && (
                        <SmallButton title="Cancel Subscription" onPress={() => updateSubscriptionStatus("CANCELLED")} />
                    )}
                    <SmallButton title="Logout" loading={loading} onPress={logout()} />
                    <SmallButton title="Delete Account" onPress={deleteAccount} />
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: horizontalScale(20)
    },
    headingContainer: {
        marginTop: verticalScale(120),
    },
    headingStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(22),
        marginBottom: verticalScale(20)
    },
    infoStyle: {
        fontFamily: Fonts.Family.SemiBold,
        marginHorizontal: horizontalScale(10)
    },
    flexStyle: {
        flexDirection: 'row'
    },
    editButton: {
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 50,
        height: 25,
        width: 25,
        alignItems: 'center',
        marginHorizontal: horizontalScale(10),
        borderColor: Colors.lightOrange,
    }
})
export default ProfileScreen
