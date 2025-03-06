import { HomeContext } from "@/store/homeProvider";
import { useContext } from "react";
import { View, } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

export default function EatOutModal() {
    const { colors } = useTheme();
    const {
        eatOutModalOpen,
        closeModal,
        decreasePoints
    } = useContext(HomeContext);
    const handleSelection = (val:number)=>{
        decreasePoints(val);
        closeModal();
    }
    return (
        <Portal>
            <Modal visible={eatOutModalOpen} onDismiss={() => closeModal()}
                contentContainerStyle={{
                    padding: 20
                }}
            >
                <View style={{
                    backgroundColor: colors.surface,
                    borderRadius: 30,
                    padding: 20
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}
                        >Where did you eat?</Text>
                    </View>
                    <View style={{ flexDirection: "column", gap: 10, padding: 10 }}>
                        <Button onPress={() => {
                            handleSelection(10);
                        }} mode="outlined">Fast Food</Button>
                        <Button onPress={() => {
                            handleSelection(10);
                        }} mode="outlined">Budget Restaurant</Button>
                        <Button onPress={() => {
                            handleSelection(10);
                        }} mode="outlined">Expensive Restaurant</Button>
                        <Button onPress={() => {
                            handleSelection(10);
                        }} mode="outlined">Other</Button>
                    </View>

                    <Button mode="contained" onPress={() => closeModal()}>Close</Button>
                </View>
            </Modal>
        </Portal>
    )
}