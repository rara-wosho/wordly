import { Stack } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <SafeAreaView className="h-full">
      <StatusBar style="auto" backgroundColor="#3b82f6" />
      <Stack
        screenOptions={{
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="settings" />
        <Stack.Screen name="chatBot" />
      </Stack>
    </SafeAreaView>
  );
}
