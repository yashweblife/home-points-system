import { Stack } from "expo-router";
import { ReactNode } from "react";
import { Appbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export type BaseViewProps = {
    name:string,
}

export default function BaseView({children, name}:{children: ReactNode, name: string}){ 
    const {colors} = useTheme();
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <Stack.Screen options={{ headerShown: false }} />
            <Appbar style={{backgroundColor: colors.background}}>
                <Appbar.Content title={name} />
            </Appbar>
            {children}
        </SafeAreaView>
    )
}