import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { Colors } from "../theme/color"
import Header from "../components/Header"
import { moderateScale, verticalScale } from "../utils/responsive"
import Fonts from "../theme/typographic"
import Button from "../components/Button"
import { RootBottomParamList } from "../core/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const ContactScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Header top={verticalScale(-40)} />
            </View>
            <View style={styles.contentConatiner}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.headingText}>
                        {"Comming Soon..."}
                    </Text>
                    <Text style={styles.textStyle}>{"In the mean time contact us via"}</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{"* Emailing contact@abc.com.pk"}</Text>
                        <Text style={styles.textStyle}>{"* Emailing via our online "}<Text style={styles.underLineText}>{"contact us page"}</Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textStyle}>{"* "}</Text>
                            <Text style={[styles.textStyle, styles.underLineText]}>{"Facebook"}</Text>
                            <Text style={styles.textStyle}>{" or "}</Text>
                            <Text style={[styles.textStyle, styles.underLineText]}>{"Insta"}</Text>
                            <Text style={styles.textStyle}>{" message us"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Shop" onPress={() => { navigation.navigate("HomeScreen") }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ContactScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
    },
    textContainer: {
        paddingVertical: verticalScale(15)
    },
    contentConatiner: {
        flex: 0.8,
        justifyContent: 'center'
    },
    headingText: {
        fontSize: moderateScale(32),
        fontFamily: Fonts.Family.Bold,
        color: Colors.slateGrey,
        paddingVertical: verticalScale(20)
    },
    textStyle: {
        fontFamily: Fonts.Family.MediumItalic,
        paddingVertical: verticalScale(5),
        color: Colors.slateGrey,
        fontSize: moderateScale(16)
    },
    underLineText: {
        textDecorationLine: 'underline'
    },
    buttonContainer: {
        alignItems: 'center'
    }
})