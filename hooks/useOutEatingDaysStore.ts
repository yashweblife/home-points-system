import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useOutEatingDaysStore() {
    const getItem = async () => {
        try {
            const data = await AsyncStorage.getItem("outEatingDays");
            return data
        } catch (error) {
            console.log(error)
        }
    }
    const setItem = async (data: any) => {
        try {
            await AsyncStorage.setItem("outEatingDays", JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }
    return {
        getItem,
        setItem,
    }
}