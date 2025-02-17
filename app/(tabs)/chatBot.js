import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Stack } from "expo-router";

import { getDefinitionFromGemini } from "../../services/GeminiService";
import InputField from "../../components/InputField";

import Ionicons from "@expo/vector-icons/Ionicons";
import useAsyncStorage from "../../hooks/useLocalStorage";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [convo, setConvo] = useAsyncStorage("wordly-convo", []);

  const scrollViewRef = useRef(null); // Reference for ScrollView

  const handleSend = async () => {
    if (!message.trim()) return;

    console.log("sending...");

    // First, add the user's message to the conversation
    setConvo((prevConvo) => [...prevConvo, { from: "me", text: message }]);
    setMessage("");

    try {
      const result = await getDefinitionFromGemini(message);

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
          {convo.map((con, index) => (
            <Text
              className={`${
                con.from === "ai"
                  ? "me-auto bg-gray-200"
                  : "ms-auto bg-primary-2 text-white"
              } py-3 max-w-96 rounded-lg mb-3 px-2`}
              key={index}
            >
              {con.text}
            </Text>
          ))}

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
      <View className="flex flex-row items-center px-3 py-3 bg-white border-t border-gray-300">
        <InputField
          multiline={true}
          value={message}
          handleChange={(e) => setMessage(e)}
          containerStyle="rounded-lg w-5/6 border border-gray-300"
        />
        <TouchableOpacity onPress={handleSend} className="p-2">
          <Ionicons name="send" size={24} color="#2D336B" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBot;
