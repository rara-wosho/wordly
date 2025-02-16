import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";

import { StatusBar } from "expo-status-bar";
import "../global.css";

import PrimaryBtn from "../components/PrimaryBtn";

const index = () => {
  return (
    <>
      <SafeAreaView className="h-full">
        <View className="h-full bg-blue-50 px-3 flex flex-col">
          <View className="py-10">
            <Text className="text-3xl font-bold text-primary-1 text-center">
              Wordly
            </Text>
          </View>
          <Link
            className="py-3 mt-2 bg-primary-2 text-white rounded-lg text-center text-lg font-bold"
            href="(tabs)"
          >
            Get Started
          </Link>
        </View>
      </SafeAreaView>

      <StatusBar style="auto" backgroundColor="#3b82f6" />
    </>
  );
};

export default index;
