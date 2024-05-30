import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import SearchComponent from "../components/SearchComponent";
import FoodCard from "../components/FoodCard";
import { foodData } from "../Home/data";
import { verticalScale } from "../utils/responsive";
import Fonts from "../theme/typographic";
import FloatingButton from "../components/FloatingButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomParamList } from "../core/types";

const SearchScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [query, setQuery] = useState<string>("");

    const handleSearch = (text: string) => {
        setQuery(text);
    };

    const filteredData = query
        ? foodData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.id.toString().includes(query) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Header top={40} />
            <ScrollView style={styles.mainContainer}>
                <SearchComponent query={query} onSearch={handleSearch} />
                {query.length > 0 && (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <FoodCard item={item} />}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContainer}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.seperatorStyle}>
                                </View>
                            )
                        }}
                    />
                )}
                {filteredData.length == 0 && (
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{"No product found!"}</Text>
                    </View>
                )}
            </ScrollView>
            <FloatingButton onPress={() => navigation.navigate("CartScreen")} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        marginTop: verticalScale(80),
        backgroundColor: 'white'
    },
    flatListContainer: {
        paddingHorizontal: 15,
    },
    seperatorStyle: {
        marginTop: verticalScale(20)
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: 16
    }
});

export default SearchScreen;
