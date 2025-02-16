import { View, Text, ScrollView, Image, Pressable } from "react-native";
import logo from "../../assets/images/wordly-logo.png";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import InputField from "../../components/InputField";

import ResultContainer from "../../components/ResultContainer";
import MiniDashboard from "../../components/MiniDashboard";
import WordToday from "../../components/WordToday";
import RecentSearches from "../../components/Favorites";

import useDebounce from "../../hooks/useDebounce";

const Index = () => {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchWord = useDebounce(searchWord, 500);

  const fetchWordDefinition = async (word) => {
    setLoading(true);

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedSearchWord) return;

    fetchWordDefinition(debouncedSearchWord);
  }, [debouncedSearchWord]);

  const handleChangeWord = (e) => {
    setSearchWord(e);
  };

  return (
    <ScrollView className="bg-white">
      <View className="h-full px-3 bg-white">
        {/* HEADER */}
        <View className="flex flex-row justify-between items-center">
          <Image className="w-14 h-14" resizeMode="contain" source={logo} />
          <Text className="text-primary-2 text-center text-3xl font-bold">
            Wordly
          </Text>
          <Link href="settings" asChild>
            <Pressable className="justify-center items-center p-2">
              <Ionicons
                name="settings-outline"
                size={24}
                color="rgb(50,50,50)"
              />
            </Pressable>
          </Link>
        </View>

        {/* <MiniDashboard /> */}

        <InputField
          value={searchWord}
          handleChange={handleChangeWord}
          containerStyle="border border-gray-300 mb-2"
          icon={<Feather name="search" size={20} color="rgb(50,50,50)" />}
        />

        {/* Display Results */}

        {debouncedSearchWord !== "" ? (
          <ResultContainer
            word={debouncedSearchWord}
            isLoading={loading}
            results={results}
          />
        ) : (
          <>
            {/* <WordToday /> */}
            <RecentSearches setSearchWord={setSearchWord} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
