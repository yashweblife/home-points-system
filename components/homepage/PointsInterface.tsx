import { HomeContext } from "@/store/homeProvider";
import { useContext } from "react";
import { View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";

export type EatOutModalProps = {
    modalState: boolean;
    setModalState: (state: boolean) => void
} 

export default function PointsInterface(){
    const {totalPoints, increasePoints, decreasePoints, openModal} = useContext(HomeContext);
    const {colors} = useTheme();
    return(
        <View style={{
            padding: 20,
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 50
        }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 20,
                    gap: 20
                }}
            >
                <IconButton
                    icon="plus"
                    size={40}
                    onPress={() => increasePoints(1)}
                    style={{
                        backgroundColor: colors.primary
                    }}
                />
                <View style={{
                    aspectRatio: 1,
                    padding: 20,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center"
                    }}>{totalPoints}</Text>
                </View>
                <IconButton
                    icon="minus"
                    size={40}
                    onPress={() => decreasePoints(1)}
                    style={{
                        backgroundColor: colors.primary
                    }}
                />
            </View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 20,
                    gap: 20
                }}
            >
                <Button mode="outlined" style={{ borderRadius: 20 }} onPress={() => increasePoints(1)}>Did You Go To The Gym?</Button>
                <Button mode="outlined" style={{ borderRadius: 20 }} onPress={() => openModal()}>Did You Eat Out?</Button>
                <Button mode="outlined" style={{ borderRadius: 20 }} onPress={()=> decreasePoints(50)}>Did you Take A Big Trip?</Button>
            </View>
        </View>
    )
}