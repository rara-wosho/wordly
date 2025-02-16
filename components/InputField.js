import { TextInput, View, Text } from "react-native";

const InputField = ({ label, icon, containerStyle, value, handleChange }) => {
  return (
    <View
      className={`${containerStyle} bg-white flex flex-row items-center justify-between rounded-lg`}
    >
      {label && <Text>TextInput</Text>}

      <TextInput
        onChangeText={handleChange}
        value={value}
        className="py-4 w-full text-[18px] text-gray-700 px-2"
        placeholder="Type a word here"
      />

      {icon && <View className="absolute right-3">{icon}</View>}
    </View>
  );
};

export default InputField;
