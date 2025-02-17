import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Stack } from "expo-router";

import { getDefinitionFromGemini } from "../../services/GeminiService";
import InputField from "../../components/InputField";

import Ionicons from "@expo/vector-icons/Ionicons";
import useAsyncStorage from "../../hooks/useLocalStorage";
import jutsie from "../../assets/images/jutsie.png";
import jutsieWave from "../../assets/images/robot.png";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [convo, setConvo] = useAsyncStorage("wordly-convo", []);

  const scrollViewRef = useRef(null); // Reference for ScrollView

  const handleSend = async () => {
    if (!message.trim()) return;

    console.log("sending...");
    const systemPrompt = `
    You are Jutsie, an AI assistant built into this app.
    You are helpful, friendly, and knowledgeable.
    Never refer to yourself as Gemini. Always introduce yourself as Jutsie if the user asks about you. This app is an online dictionary with ai capabilities to explore other definitions of a word that the dictionary cannot define, It also has a chatbot to help users with their needs in the app.
  `;

    const userMessage = `${systemPrompt}\n\nUser: ${message}\n\nJutsie:`;

    // First, add the user's message to the conversation
    setConvo((prevConvo) => [...prevConvo, { from: "me", text: message }]);
    setMessage("");

    try {
      const result = await getDefinitionFromGemini(userMessage);

      const responseText =
        result || "The server is busy. Please try again later.";
      setResponse(responseText);

      // Append AI response to the conversation
      setConvo((prevConvo) => [
        ...prevConvo,
        { from: "me", text: message },
        { from: "ai", text: responseText },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Auto-scroll to the bottom when conversation updates
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [convo]);

  const keyboardVerticalOffset = Platform.OS === "ios" ? 65 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          title: "Jutsie",
          headerShown: true,
          headerTintColor: "#20074a",
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 14 },
        }}
      />
      <ScrollView
        ref={scrollViewRef} // Assign the ref to ScrollView
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="h-full px-3 py-3">
          {convo.length > 0 ? (
            convo.map((con, index) => (
              <View key={index} className="flex flex-row items-end mb-3">
                {con.from === "ai" && (
                  <Image
                    className="w-8 h-8 me-1"
                    resizeMode="cover"
                    source={jutsie}
                  />
                )}
                <Text
                  className={`${
                    con.from === "ai"
                      ? "me-auto bg-gray-200"
                      : "ms-auto bg-primary-2 text-white"
                  } py-3 max-w-96 rounded-lg px-2 text-lg`}
                >
                  {con.text}
                </Text>
              </View>
            ))
          ) : (
            <View className="flex h-full items-center justify-center py-10">
              <Image
                className="w-28 h-28"
                resizeMode="contain"
                source={jutsieWave}
              />
              <Text className="text-lg text-center text-gray-500">
                My name is Jutsie, Ask something to start a conversation with me
              </Text>
            </View>
          )}

          {convo.length > 0 && (
            <TouchableOpacity
              className="inline-block"
              onPress={() => setConvo([])}
            >
              <Text className="text-gray-600 py-2 px-2">
                Delete Conversation
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Input Field Section */}
      <View className="flex flex-row items-center px-3 py-3 bg-white">
        <InputField
          multiline={true}
          value={message}
          handleChange={(e) => setMessage(e)}
          containerStyle="rounded-lg  border border-gray-300"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="px-2 absolute right-5 py-2"
        >
          <Ionicons name="send" size={24} color="#2D336B" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBot;
