import AsyncStorage from "@react-native-async-storage/async-storage";
export default function usePointsStore() {
    const getItem = async () => {
        try {
            const data = await AsyncStorage.getItem("points");
            if(data) return JSON.parse(data)
            return new Error("POINTS DNE")
        } catch (error) {
            console.log(error)
        }
    }
    const setItem = async (data: any) => {
        try {
            await AsyncStorage.setItem("points", JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }
    return {
        getItem,
        setItem,
    }
}