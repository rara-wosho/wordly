import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import useAsyncStorage from "../hooks/useLocalStorage";

import DefinitionBox from "./DefinitionBox";
import WordCard from "./WordCard";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

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
      {/* <View className="p-3 bg-violet-50 mb-2 rounded-lg flex flex-row items-center">
        <Text className="text-primary-2 uppercase font-bold text-3xl">
          {word}
        </Text>

        <TouchableOpacity
          className="ms-auto px-2"
          onPress={() => addFavorite(word)}
        >
          {favorites.includes(word) ? (
            <AntDesign name="star" size={20} color="violet" />
          ) : (
            <AntDesign name="staro" size={20} color="gray" />
          )}
        </TouchableOpacity>
      </View> */}
      {results.map((result, index) => (
        <WordCard key={index} result={result} />
      ))}
    </View>
  ) : (
    <View className="flex justify-center items-center py-4">
      <Text className="text-gray-600 text-xl">
        No result for "{word}" from traditional dictionary.
      </Text>
    </View>
  );
};

export default ResultContainer;
