import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD2DarkTheme, PaperProvider } from "react-native-paper";

const customTheme = {
    ...MD2DarkTheme,
    colors: {
        ...MD2DarkTheme.colors,
        surface: '#2A2A2A',
        primary: '#659765',
    }
}


export default function RootLayout() {
    return (
        <PaperProvider theme={customTheme}>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="dashboard" />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar />
        </PaperProvider>
    )
}