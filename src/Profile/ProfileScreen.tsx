import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
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
import { clearUser, clearAddress } from "../redux/users/userSlices";
import { StackActions } from "@react-navigation/native";
const ProfileScreen = ({
    navigation
}: NativeStackScreenProps<RootStackParamList>) => {
    const data = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("Inside Profile Screen");
    }, [])
    const logout = useCallback (() => () => {
        console.log("hafafvajfv")
        setLoading(true);
        dispatch(clearUser());
        dispatch(clearAddress());
        navigation.dispatch( StackActions.replace("AuthStack"))
        setLoading(false);
    }, [])
    return (
        <ScrollView style={styles.mainContainer}>
            <View>
                <Header top={50} text = {`Hi ${data.name} !`} />   
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
                <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("EditInfoScreen")}>
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
                    <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("EditAddressInfoScreen")}>
                        <Icon name="pencil" size={13} color={"black"} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={[styles.headingContainer, { marginTop: verticalScale(30) }]}>
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
                    <TouchableOpacity style={styles.editButton}>
                        <Icon name="pencil" size={13} color={"black"} />
                    </TouchableOpacity>
                </View>

            </View>

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
            <View style ={{alignItems:"center", marginVertical:20}}>
            <SmallButton title="Activate Subscription"/>
            <SmallButton title="Logout" loading={loading} onPress={logout()}/>
            <SmallButton title="Delete Account"/>
            </View>
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