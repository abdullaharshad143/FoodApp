import React, { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { horizontalScale, verticalScale } from "../utils/responsive";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    top: number,
}
const Header: React.FC<HeaderProps> = ({top = 0}) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        navigation.goBack();
    }, []);
    return (
        <SafeAreaView style={[styles.mainContainer, {top}]}>
            <View>
                <TouchableOpacity style={styles.backButton} onPress={handlePress}>
                    <Icon name="chevron-left" size={20} color={'#3e4343'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        position:'absolute',
    },
    backButton: {
        width: horizontalScale(45),
        marginHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(8),
        borderRadius: 50,
        alignItems: 'center',
    }
})
export default Header;