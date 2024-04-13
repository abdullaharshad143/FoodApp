import React, { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../theme/typographic";

interface HeaderProps {
    top: number,
    text?: string,
}
const Header: React.FC<HeaderProps> = ({ top = 0, text }) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        navigation.goBack();
    }, []);
    return (
        <SafeAreaView style={[styles.mainContainer, { top }]}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <TouchableOpacity style={styles.backButton} onPress={handlePress}>
                        <Icon name="chevron-left" size={20} color={'#3e4343'} />
                    </TouchableOpacity>
                </View>
                {text &&
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{text}</Text>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        position: 'absolute',
    },
    backButton: {
        width: horizontalScale(45),
        marginHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(8),
        borderRadius: 50,
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: "center",
        width: '70%',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(20)
    }
})
export default Header;