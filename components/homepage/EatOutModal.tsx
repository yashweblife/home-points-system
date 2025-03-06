import { View, } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

export type EatOutModalProps = {
    state: boolean,
    setState: (state: boolean) => void
    handleSubmit: (val: number) => void
}

export default function EatOutModal({ state, setState, handleSubmit }: EatOutModalProps) {
    const { colors } = useTheme();
    return (
        <Portal>
            <Modal visible={state} onDismiss={() => setState(false)}
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
                            handleSubmit(10);
                            setState(false);
                        }} mode="outlined">Fast Food</Button>
                        <Button onPress={() => {
                            handleSubmit(10);
                            setState(false);
                        }} mode="outlined">Budget Restaurant</Button>
                        <Button onPress={() => {
                            handleSubmit(10);
                            setState(false);
                        }} mode="outlined">Expensive Restaurant</Button>
                        <Button onPress={() => {
                            handleSubmit(10);
                            setState(false);
                        }} mode="outlined">Other</Button>
                    </View>

                    <Button mode="contained" onPress={() => setState(false)}>Close</Button>
                </View>
            </Modal>
        </Portal>
    )
}