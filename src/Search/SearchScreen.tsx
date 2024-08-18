import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import SearchComponent from "../components/SearchComponent";
import FoodCard from "../components/FoodCard";
// import { foodData } from "../Home/data";
import { verticalScale } from "../utils/responsive";
import Fonts from "../theme/typographic";
import FloatingButton from "../components/FloatingButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IProduce, RootBottomParamList } from "../core/types";
import { fetchFoodItems } from "../utils/getProduceItems";
import { Colors } from "../theme/color";

const SearchScreen = ({
    navigation,
}: NativeStackScreenProps<RootBottomParamList>) => {
    const [query, setQuery] = useState<string>("");
    const [foodItems, setFoodItems] = useState<IProduce[]>([]);
    const [loading, setLoading] = useState(false)
    const handleSearch = (text: string) => {
        setQuery(text);
    };

    useEffect(() => {
        const loadFoodItems = async () => {
            setLoading(true)
            try {
                const items = await fetchFoodItems();
                setFoodItems(items);
            } catch (error) {
                console.error("Error loading food items:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFoodItems();
    }, []);

    const filteredData = query
        ? foodItems.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.id.toString().includes(query) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];
    if(loading){
        return(
            <View style={{justifyContent:'center', flex:1}}>
                <ActivityIndicator size={'large'} color={Colors.lightOrange}></ActivityIndicator>
            </View>
        )
    }

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
                {!query && (
                    <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>{"Please type to search something!"}</Text>
                </View>
                )}
                {filteredData.length == 0 && query && (
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
