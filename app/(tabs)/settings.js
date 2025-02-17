import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Settings = () => {
  return (
    <ScrollView className="h-full bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerTintColor: "rgb(50,50,50)",
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 14 },
        }}
      />
      <View className="px-4 h-full py-3">
        <View className="flex py-3 flex-row items-center justify-between">
          <Text className="text-gray-500 text-lg">Date Released</Text>
          <Text className="text-gray-500 text-lg">02-20-2025</Text>
        </View>
        <View className="flex py-3 flex-row items-center justify-between">
          <Text className="text-gray-500 text-lg">Updates</Text>
          <Text className="text-gray-500 text-lg">Patch Notes 1.45</Text>
        </View>
        <View className="flex py-3 flex-row items-center justify-between">
          <Text className="text-gray-500 text-lg">Version</Text>
          <Text className="text-gray-500 text-lg">1.23</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          className="border border-gray-300 py-3 mt-6 rounded-lg"
        >
          <Text className="text-red-600 text-xl text-center">
            Clear App Data
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
