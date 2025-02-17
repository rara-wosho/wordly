import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import jutsie from "../assets/images/robot.png";
import AntDesign from "@expo/vector-icons/AntDesign";

const GeminiResponseCard = ({ word, response, containerStyle, isLoading }) => {
  const [shrink, setShrink] = useState(false);

  return (
    <View
      className={`${containerStyle} bg-primary-2 pt-3 pb-4 px-4 rounded-lg`}
    >
      <View className="flex flex-row items-center">
        <Image className="w-20 h-20" source={jutsie} />
        <View>
          <Text className="text-xl text-white font-bold">JUTSIE</Text>
          <Text className="text-white">Your personal AI assistant</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShrink(!shrink)}
          className="ms-auto px-2"
        >
          <AntDesign
            name={shrink ? "caretdown" : "caretup"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {!shrink && (
        <View className="mt-3">
          {isLoading ? (
            <ActivityIndicator className="mb-2" color="white" />
          ) : word ? (
            <>
              <Text className="text-lg text-white font-bold mb-2">
                You searched "{word}"
              </Text>

              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-lg">{response}</Text>
              )}
            </>
          ) : (
            <Text className="text-white text-lg">
              I am Jutsie, an AI assistant that can help you find definitions of
              some words that traditional dictionary cannot.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default GeminiResponseCard;
