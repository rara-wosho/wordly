import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import DefinitionBox from "./DefinitionBox";

import useAsyncStorage from "../hooks/useLocalStorage";

const WordCard = ({ result }) => {
  const [favorites, setFavorites] = useAsyncStorage("wordly-favorites", []);

  console.table(result);
  const addFavorite = (word) => {
    if (favorites.includes(word)) {
      // Remove the word from favorites
      const updatedFavorites = favorites.filter((fav) => fav !== word);
      setFavorites(updatedFavorites);
      console.log("Removed from favorites:", updatedFavorites);
    } else {
      // Add the word to favorites
      const updatedFavorites = [...favorites, word];
      setFavorites(updatedFavorites);
      console.log("Added to favorites:", updatedFavorites);
    }
  };

  if (!result) return null;

  return (
    <View className="p-3 rounded-lg  bg-violet-50 mb-3">
      {/* <View className="flex flex-row items-center">
        <Feather name="book-open" size={20} color="violet" />
        <Text className="text-3xl ms-2 font-semibold text-gray-600">
          {result?.word}
        </Text>

        <TouchableOpacity
          className="ms-auto"
          onPress={() => addFavorite(result.word)}
        >
          {favorites.includes(result.word) ? (
            <AntDesign name="star" size={20} color="violet" />
          ) : (
            <AntDesign name="staro" size={20} color="gray" />
          )}
        </TouchableOpacity>
      </View> */}

      {/* ORIGIN  */}
      {result.phonetic && (
        <Text className="text-lg mt-1 text-gray-700">{result?.phonetic}</Text>
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
