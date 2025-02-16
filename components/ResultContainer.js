import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

import DefinitionBox from "./DefinitionBox";
import WordCard from "./WordCard";

const ResultContainer = ({ word, results, isLoading }) => {
  if (isLoading)
    return (
      <View className="flex flex-row items-center py-4">
        <ActivityIndicator />
        <Text className="ms-3 text-gray-600 text-xl">Searching '{word}'</Text>
      </View>
    );

  return results.length > 0 ? (
    <View className="py-2">
      <View className="p-3 bg-violet-50 mb-2 rounded-lg">
        <Text className="text-primary-2 uppercase font-bold text-3xl">
          {word}
        </Text>
      </View>
      {results.map((result, index) => (
        <WordCard key={index} result={result} />
      ))}
    </View>
  ) : (
    <View className="flex justify-center items-center py-4">
      <Text className="text-gray-600 text-xl">No result for "{word}"</Text>
    </View>
  );
};

export default ResultContainer;
