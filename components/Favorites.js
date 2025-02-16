import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import useAsyncStorage from "../hooks/useLocalStorage";

const Favorites = ({ setSearchWord }) => {
  const [favorites, setFavorites] = useAsyncStorage("wordly-favorites", []);

  const handleClick = (word) => {
    setSearchWord(word);
  };

  const removeFavorite = (word) => {
    const updatedFavorites = favorites.filter((fav) => fav !== word);
    setFavorites(updatedFavorites);
  };

  if (!favorites) return null;

  return (
    <View>
      <Text className="text-xl text-gray-600 font-bold mb-2">Favorites</Text>

      {favorites.length > 0 ? (
        favorites.map((fav, i) => (
          <View
            key={i}
            className="flex flex-row items-center justify-between bg-gray-100 p-3 rounded-lg mb-2"
          >
            <AntDesign name="staro" size={18} color="violet" />
            <TouchableOpacity
              onPress={() => handleClick(fav)}
              className="flex-1 ms-2"
            >
              <Text className="text-xl text-gray-600">{fav}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(fav)}>
              <Feather name="trash" size={18} color="red" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-lg text-gray-500 mb-2">No History</Text>
      )}
    </View>
  );
};

export default Favorites;
