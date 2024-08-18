import AsyncStorage from "@react-native-async-storage/async-storage";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { addWeeks, format, nextSaturday } from "date-fns";
import sendEmail from "./sendEmail";

export const checkAndUpdateOrderStatus = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in AsyncStorage');
        }
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            throw new Error('User document not found');
        }

        const userData = userDocSnapshot.data();
        const status = userData.status;
        if (status !== "ACTIVE" && status !== "SCHEDULED") {
            return;
        }
        const collectionName = status === "ACTIVE" ? "subscription" : "oneTime";
        const orderId = userData.orderId;
        if (!orderId) {
            throw new Error('Order ID not found in user document');
        }

        const orderDocRef = doc(db, collectionName, orderId);
        const orderDocSnapshot = await getDoc(orderDocRef);

        if (!orderDocSnapshot.exists()) {
            throw new Error('Order document not found');
        }

        const orderData = orderDocSnapshot.data();
        const { nextPaymentDueDate, paymentSuccess, frequency } = orderData;
        const dueDate = new Date(nextPaymentDueDate);
        const currentDate = new Date();
        if (currentDate < dueDate) {
            return;
        }
        if (currentDate > dueDate) {
            if (!paymentSuccess) {
                await updateDoc(orderDocRef, { status: 'CANCELLED' });
                await updateDoc(userDocRef, { status: 'CANCELLED' });
                alert("Your order has been cancelled due to non-payment!");
            } else {
                await updateDoc(orderDocRef, { status: 'COMPLETE' });
                await updateDoc(userDocRef, {
                    pastOrders: arrayUnion(orderId)
                });

                const userEmail = userData.email; // Ensure user's email is stored in userData
                const subject = status === "ACTIVE"
                    ? 'Your Subscription Order Update'
                    : 'Your One-Time Order Update';
                const text = status === "ACTIVE"
                    ? `Your previous order is confirmed and will be delivered today. Your next order has been generated with a total price of ${orderData.totalPrice}. The next delivery is scheduled for ${format(nextSaturday(currentDate), 'yyyy-MM-dd')}. You can edit the order before making a payment.`
                    : `Your one-time order is confirmed and will be delivered today. The total price is ${orderData.totalPrice}.`;

                await sendEmail(userEmail, subject, text);

                if (status === "ACTIVE") {
                    let newDueDate;
                    switch (frequency) {
                        case 1:
                            newDueDate = nextSaturday(currentDate);
                            break;
                        case 2:
                            newDueDate = addWeeks(nextSaturday(currentDate), 2);
                            break;
                        case 3:
                            newDueDate = addWeeks(nextSaturday(currentDate), 3);
                            break;
                        case 4:
                            newDueDate = addWeeks(nextSaturday(currentDate), 4);
                            break;
                        default:
                            newDueDate = nextSaturday(currentDate);
                    }
                    const newOrderData = {
                        ...orderData,
                        orderDate: new Date().toISOString(),
                        nextPaymentDueDate: format(newDueDate, 'yyyy-MM-dd'),
                        status: 'ACTIVE',
                        paymentSuccess: false
                    };

                    const newOrderRef = doc(collection(db, collectionName));
                    await setDoc(newOrderRef, newOrderData);
                    await updateDoc(userDocRef, {
                        orderId: newOrderRef.id,
                        status: 'ACTIVE'
                    });

                    alert("Your previous order is confirmed and will be delivered today. In the meantime, your next order has been generated.");
                } else if (status === "SCHEDULED") {
                    await updateDoc(userDocRef, {
                        status: ''
                    });
                    alert("Your one-time order is confirmed and will be delivered today.");
                }
            }
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};