import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import Fonts from "../theme/typographic";

const SearchComponent = () => {
    return (
        <View style={styles.mainContainer}>
            <Icon style={{ marginHorizontal: 10 }} name="search" size={25} color={Colors.lightGrey} />
            <TextInput
                placeholder="Search"
                style={styles.inputStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 8,
        margin: 10,
        borderColor: Colors.lightGrey,
        flexDirection: 'row'
    },
    inputStyle: {
        marginHorizontal: 5,
        flex: 1,
        fontFamily: Fonts.Family.SemiBold
    }
})
export default SearchComponent;