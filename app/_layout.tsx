import { Stack } from "expo-router";
import { MD2DarkTheme, PaperProvider } from "react-native-paper";
export default function RootLayout() {
    return (
        <PaperProvider theme={MD2DarkTheme}>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="dashboard" />
                <Stack.Screen name="+not-found" />
            </Stack>
        </PaperProvider>
    )
}