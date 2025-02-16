import { View, Text } from "react-native";
import WordCard from "./WordCard";

const WordToday = () => {
  return (
    <View className="mb-4">
      <Text className="text-xl text-gray-600 font-bold mb-2">
        Word for Today
      </Text>

      <WordCard />
    </View>
  );
};

export default WordToday;
