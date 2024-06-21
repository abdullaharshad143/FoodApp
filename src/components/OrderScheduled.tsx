import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'
import { moderateScale, verticalScale } from "../utils/responsive";
import Fonts from "../theme/typographic";
import { Colors } from "../theme/color";
import Button from "./Button";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { formatDate, getNextDayOfWeek } from "../utils/date";


interface OrderScheduledProps {
    onPress?: () => void;
}

const OrderScheduled: React.FC<OrderScheduledProps> = ({ onPress }) => {
    useEffect (()=>{
    }, [])
    const saturdaydate = getNextDayOfWeek(6)
    const tuesdayDate = getNextDayOfWeek(2);
    const saturdayFormattedDate = formatDate(saturdaydate)
    const tuesdayFormattedDate = formatDate(tuesdayDate)
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingStyle}>{"Order Scheduled"}</Text>
            <View style={styles.contentContainer}>
                <View>
                    <Icon style={styles.iconStyle} name="credit-card" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.textStyle}>{`Billing on ${saturdayFormattedDate}`}</Text>
                    <Text style={styles.lightTextStyle}>{"At cut off 11:59pm"}</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View>
                    <Icon style={styles.iconStyle} name="truck" size={25} color={"black"} />
                </View>
                <View>
                    <Text style={styles.textStyle}>{`Delivery on ${tuesdayFormattedDate}`}</Text>
                    <Text style={styles.lightTextStyle}>{"Before 6:30pm"}</Text>
                </View>
            </View>
            {/* <View> */}
            <Button title="Edit Order" onPress={onPress} />
            {/* </View> */}
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextStyle}>{"You can edit your order before it's billed before cut off"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.authBackground
    },
    headingStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: 28,
        color: Colors.slateGrey,
        margin: 20
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: 18,
    },
    lightTextStyle: {
        fontFamily: Fonts.Family.Regular,
        color: Colors.lightGrey,
        marginTop: 5
    },
    infoTextStyle: {
        fontFamily: Fonts.Family.MediumItalic,
        color: Colors.lightGrey,
    },
    infoTextContainer: {
        marginTop: 20
    },
    contentContainer: {
        flexDirection: "row",
        paddingVertical: 15
    },
    iconStyle: {
        margin: 10
    }
})

export default OrderScheduled;