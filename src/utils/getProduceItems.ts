import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IProduce } from "../core/types";
export const fetchFoodItems = async (): Promise<IProduce[]> => {
    try {
        const produceItemsCollectionRef = collection(db, "produceItems");
        const querySnapshot = await getDocs(produceItemsCollectionRef);
        const foodItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as IProduce));

        return foodItems;
    } catch (error) {
        console.error("Error fetching food items:", error);
        throw error;
    }
};
