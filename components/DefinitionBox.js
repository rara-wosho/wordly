import { View, Text } from "react-native";
import React from "react";

const DefinitionBox = ({ def }) => {
  return (
    <View className="">
      <Text className="text-sm text-gray-500">Definition</Text>
      <Text className="text-lg">{def}</Text>
    </View>
  );
};

export default DefinitionBox;
