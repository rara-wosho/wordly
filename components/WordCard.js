import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import DefinitionBox from "./DefinitionBox";

import useAsyncStorage from "../hooks/useLocalStorage";

const WordCard = ({ result }) => {
  if (!result) return null;

  return (
    <View className="p-3 rounded-lg  bg-violet-50 mb-3">
      <Text className="text-xl uppercase font-bold mt-1 text-gray-600">
        {result?.word}
      </Text>
      {/* ORIGIN  */}
      {result.phonetic && (
        <Text className="text-lg text-gray-700">{result?.phonetic}</Text>
      )}
      {result.origin && (
        <Text className="text-lg mt-1 text-gray-700">{result?.origin}</Text>
      )}

      {/* Meanings */}
      {result?.meanings?.map((meaning, idx) => (
        <View key={idx} className="mt-3">
          <Text className="text-lg font-semibold mt-1 text-gray-700">
            {meaning.partOfSpeech}
          </Text>
          {meaning.definitions.map((def, i) => (
            <View key={i} className="mt-1">
              <DefinitionBox def={def.definition} />
              {def.example && (
                <Text className="text-gray-500 text-lg pb-2 mb-3 italic">
                  "{def.example}"
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default WordCard;
