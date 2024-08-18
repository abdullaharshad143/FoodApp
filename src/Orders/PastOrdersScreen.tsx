import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Fonts from "../theme/typographic";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsive";
import { CompleteOrder } from "../core/types";
const PastOrders = () => {
    const [pastOrders, setPastOrders] = useState<CompleteOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<CompleteOrder | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchPastOrders = async () => {
          try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
              throw new Error('User ID not found in AsyncStorage');
            }
            const userDocRef = doc(db, 'users', userId);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              if (userData.pastOrders) {
                const orderPromises = userData.pastOrders.map(async (orderId: string) => {
                  let orderData: any = null;
    
                  const subscriptionDocRef = doc(db, 'subscription', orderId);
                  const subscriptionDocSnapshot = await getDoc(subscriptionDocRef);
                  if (subscriptionDocSnapshot.exists()) {
                    orderData = { id: orderId, ...subscriptionDocSnapshot.data() };
                  }
    
                  if (!orderData) {
                    const oneTimeDocRef = doc(db, 'oneTime', orderId);
                    const oneTimeDocSnapshot = await getDoc(oneTimeDocRef);
                    if (oneTimeDocSnapshot.exists()) {
                      orderData = { id: orderId, ...oneTimeDocSnapshot.data() };
                    }
                  }
    
                  return orderData;
                });
    
                const orders = await Promise.all(orderPromises);
                setPastOrders(orders.filter(order => order !== null) as CompleteOrder[]);
              }
            }
          } catch (error) {
            console.error("Error fetching past orders:", error);
          }
        };
        fetchPastOrders();
      }, []);
   

    const renderOrderItem = ({ item }: {item:CompleteOrder }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => {
                setSelectedOrder(item);
                setModalVisible(true);
            }}
        >
            <Text style={styles.orderText}>Order ID: {item.id}</Text>
            <Text style={styles.orderText}>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    const renderModalContent = () => {
        if (!selectedOrder) return null;

        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Order Details</Text>
                <Text style={styles.modalText}>Order ID: {selectedOrder.id}</Text>
                <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
                <Text style={styles.modalText}>Delivery Date: {selectedOrder.nextPaymentDueDate}</Text>
                <Text style={styles.modalText}>Price: Rs {selectedOrder.totalPrice}</Text>
                <FlatList
                    data={selectedOrder.cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image source={item.image} style={styles.productImage} />
                            <Text style={styles.productText}>{item.name}</Text>
                            <Text style={styles.productText}>Quantity: {item.quantity}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={pastOrders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
                ListEmptyComponent={() => (
                    <View style={styles.contentContainer}>
                        <Icon name="calendar" size={30} color={"black"} />
                        <Text style={styles.textStyle}>{"No past orders yet 😊"}</Text>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {renderModalContent()}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingVertical: verticalScale(30)
    },
    contentContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(18),
        marginHorizontal: horizontalScale(20),
        textAlignVertical: 'center'
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    orderText: {
        fontFamily: Fonts.Family.Regular,
        fontSize: moderateScale(16),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontFamily: Fonts.Family.Bold,
        fontSize: moderateScale(20),
        marginBottom: verticalScale(10),
      },
      modalText: {
        fontFamily: Fonts.Family.Regular,
        fontSize: moderateScale(16),
        marginVertical: verticalScale(5),
      },
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(10),
      },
      productImage: {
        width: 50,
        height: 50,
        marginRight: horizontalScale(10),
      },
      productText: {
        fontFamily: Fonts.Family.Regular,
        fontSize: moderateScale(16),
      },
      closeButton: {
        marginTop: verticalScale(20),
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(20),
        backgroundColor: '#2196F3',
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
        fontFamily: Fonts.Family.SemiBold,
        fontSize: moderateScale(16),
      },
    });
    
    export default PastOrders;
    
