import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { horizontalScale, verticalScale } from "../utils/responsive"
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../theme/typographic";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomParamList, RootStackParamList } from "../core/types";

const FloatingButton = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("CartScreen")} style={styles.mainCointainer}>
            <Icon name="shopping-cart" size={22} color={"black"} />
            <Text style={styles.textStyle}>{'$40.29'}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    mainCointainer: {
        flex: 1,
        backgroundColor: "orange",
        zIndex:1,
        position:'absolute',
        bottom:10,
        justifyContent:'center',
        alignSelf:'center',
        borderRadius: 25,
        padding:15,
        flexDirection:'row',
    },
    textStyle:{
        marginLeft: horizontalScale(5),
        fontFamily: Fonts.Family.Bold,
        fontSize: 17
    }
})
export default FloatingButton