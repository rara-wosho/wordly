import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import useAsyncStorage from "../hooks/useLocalStorage";
import { useState, useEffect } from "react";

const MiniDashboard = () => {
  const [favorites, setFavorites] = useAsyncStorage("wordly-favorites", []);
  const [favoriteCount, setFavoriteCount] = useState(favorites.length);

  useEffect(() => {
    setFavoriteCount(favorites.length); // Update count when favorites change
  }, [favorites]); // Dependency array ensures it updates when favorites change

  return (
    <View style={{ marginBottom: 8 }} className="flex flex-row justify-center">
      <View className="border-e-2 border-gray-300 w-1/2 py-1 px-3">
        <Text className="text-center text-lg text-gray-500">
          <AntDesign name="staro" size={20} color="violet" />
          Favorites: {favoriteCount}
        </Text>
      </View>
      <View className="w-1/2 py-1 px-3">
        <Text className="text-center text-lg text-gray-500">
          <Feather name="search" size={20} color="violet" />
          Searches: 34
        </Text>
      </View>
    </View>
  );
};

export default MiniDashboard;
