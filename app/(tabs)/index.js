import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/images/wordly-logo.png";
import jutsie from "../../assets/images/jutsie.png";
import { Link } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import InputField from "../../components/InputField";
import ResultContainer from "../../components/ResultContainer";
import RecentSearches from "../../components/Favorites";
import GeminiResponseCard from "../../components/GeminiResponseCard";

import useDebounce from "../../hooks/useDebounce";
import useAsyncStorage from "../../hooks/useLocalStorage";
import { getDefinitionFromGemini } from "../../services/GeminiService";

const Index = () => {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Combined loading state
  const [aiResponse, setAiResponse] = useState("");
  const [favorites, setFavorites] = useAsyncStorage("wordly-favorites", []);

  let debouncedSearchWord = useDebounce(searchWord, 500);

  const handleResponse = async (word) => {
    console.log("Fetching from Gemini...");
    try {
      const prompt = `Define the word "${word}" and provide an example sentence. Strictly follow the format being described below without using asterisk. Make four rows containing titles Definition, example sentence, history, and other facts. Separate those rows of texts with atleast one line`;

      const result = await getDefinitionFromGemini(prompt);
      if (result) {
        setAiResponse(result);
      } else {
        setAiResponse(
          "Sorry, I could not fetch the definition of the word that you are searching."
        );
      }
    } catch (error) {
      console.error("From Index: Error fetching from Gemini:", error);
      setAiResponse("Sorry, I could not fetch the definition.");
    }
  };

  const fetchWordDefinition = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // adding word to favorites
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

  useEffect(() => {
    if (!debouncedSearchWord) return;

    // Set loading to true when fetching starts
    setLoading(true);

    // Fetch data from both APIs
    Promise.all([
      fetchWordDefinition(debouncedSearchWord),
      handleResponse(debouncedSearchWord),
    ])
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        // Set loading to false when both requests are done
        setLoading(false);
      });
  }, [debouncedSearchWord]);

  const handleChangeWord = (e) => {
    setSearchWord(e);
  };

  const clearSearchWord = () => {
    setSearchWord("");
  };

  return (
    <>
      <Link
        className="z-10 absolute bottom-10 right-6 rounded-full"
        href="chatBot"
        asChild
      >
        <Pressable>
          <Image source={jutsie} resizeMethod="cover" className="w-14 h-14" />
        </Pressable>
      </Link>
      <ScrollView className="bg-white relative">
        {/* how do i position this image in bottomm right  */}
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

          <InputField
            value={searchWord}
            handleChange={handleChangeWord}
            containerStyle="border border-gray-300 mb-2"
            icon={<Feather name="search" size={20} color="rgb(50,50,50)" />}
          />

          {searchWord && (
            <View className="py-3 pe-3 bg-violet-50 my-2 rounded-lg flex flex-row items-center">
              <Text
                className="text-primary-2 w-9/12 ps-3 uppercase font-bold text-2xl"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {searchWord}
              </Text>

              <TouchableOpacity
                className="ms-auto px-2"
                onPress={clearSearchWord}
              >
                <Feather name="delete" size={20} color="gray" />
              </TouchableOpacity>

              <TouchableOpacity
                className="px-2"
                onPress={() => addFavorite(debouncedSearchWord)}
              >
                {favorites?.includes(debouncedSearchWord) ? (
                  <AntDesign name="star" size={20} color="violet" />
                ) : (
                  <AntDesign name="staro" size={20} color="gray" />
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Gemini Response Card */}
          <GeminiResponseCard
            word={debouncedSearchWord}
            containerStyle="my-2"
            response={aiResponse}
            isLoading={loading}
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
    </>
  );
};

export default Index;
