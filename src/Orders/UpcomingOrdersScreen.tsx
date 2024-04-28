import { Text, View, StyleSheet } from "react-native"
import Fonts from "../theme/typographic"
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive"
import { FontAwesome as Icon } from "@expo/vector-icons";

const UpcomingOrders = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <Icon name="calendar" size={30} color={"black"} />
                <Text style={styles.textStyle}>{"No upcoming orders yet 😊"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingVertical: verticalScale(30)
    },
    contentContainer: {
        flexDirection: 'row'
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(18),
        marginHorizontal: horizontalScale(20),
        textAlignVertical: 'center'
    }
})

export default UpcomingOrders