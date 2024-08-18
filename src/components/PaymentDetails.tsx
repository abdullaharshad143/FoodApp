import React from "react";
import { Text, StyleSheet, View } from "react-native"
import Fonts from "../theme/typographic"
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { formatDate, getNextDayOfWeek } from "../utils/date";
import { formatDate } from "../utils/formatDate";
import { getNextSaturday } from "../utils/date";


const PaymentDetails = () => {
    const totalPrice = useSelector((state: RootState) => state.pr oduce.totalPrice);
    // const saturdaydate = getNextDayOfWeek(6)
    // const tuesdayDate = getNextDayOfWeek(2);
    // const saturdayFormattedDate = formatDate(saturdaydate)
    const deliveryDate = useSelector((state:any) => state.delivery.deliveryDate);
    const deliveryFormattedDate = formatDate(deliveryDate)
    const nextSaturday = getNextSaturday();
    // const tuesdayFormattedDate = formatDate(tuesdayDate)
    const paymentSuccess = useSelector((state: any) => state.payment.paymentSuccess);
    let priceWithDelivery = 150
    if(totalPrice){
        priceWithDelivery += totalPrice
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.flexDirection}>
                <Text style={styles.textStyle}>{'Produce Total'}</Text>
                <Text style={styles.textStyle}>Rs {totalPrice}</Text>
            </View>
            <View style={styles.flexDirection}>
                <Text style={styles.textStyle}>{'Delivery Fee'}</Text>
                <Text style={styles.textStyle}>Rs {'150'}</Text>
            </View>
            <View style={styles.flexDirection}>
                <Text style={styles.textStyle}>{'Total Amount'}</Text>
                <Text style={styles.textStyle}>Rs {priceWithDelivery}</Text>
            </View>
            <View style={styles.deliveryDetailsContainer}>
                <View style={styles.flex}>
                    <View>
                        <Icon name="credit-card" size={30} color={'black'} style={styles.iconStyle} />
                    </View>
                    <View>
                        {!paymentSuccess ? (
                            <Text style={[styles.textStyle, styles.margin]}>{`You can bill any time before ${nextSaturday}`}</Text>
                            /* <Text style={[styles.lightTextStyle, styles.margin]}>{'At cut-off 11:59 pm'}</Text> */
                        ) : (
                            <Text style={[styles.textStyle, styles.margin, {marginTop:7}]}>{`Billing is done!`}</Text>
                            /* <Text style={[styles.lightTextStyle, styles.margin]}>{'At cut-off 11:59 pm'}</Text> */
                        )}
                    </View>
                </View>
                <View style={styles.flex}>
                    <View>
                        <Icon name="truck" size={30} color={'black'} style={styles.iconStyle} />
                    </View>
                    <View>
                        <Text style={[styles.textStyle, styles.margin]}>{`Delivery on ${nextSaturday}`}</Text>
                        <Text style={[styles.lightTextStyle, styles.margin]}>{'Before 6:30 pm'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    flexDirection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
        // backgroundColor:'red'
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(18)
    },
    deliveryDetailsContainer: {
        marginTop: verticalScale(30)
    },
    lightTextStyle: {
        fontFamily: Fonts.Family.MediumItalic,
        color: Colors.slateGrey,
        fontSize: moderateScale(14)
    },
    flex: {
        flexDirection: 'row',
        // justifyContent:'space-evenly',
        marginTop: verticalScale(30)
    },
    iconStyle: {
        marginTop: verticalScale(5)
    },
    margin: {
        marginHorizontal: horizontalScale(20)
    }
})
export default PaymentDetails