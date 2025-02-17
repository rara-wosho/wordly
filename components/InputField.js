import { TextInput, View, Text } from "react-native";

const InputField = ({
  label,
  icon,
  containerStyle,
  value,
  handleChange,
  multiline,
}) => {
  return (
    <View
      className={`${containerStyle} bg-white flex w-full flex-row items-center justify-between rounded-lg`}
    >
      {label && <Text>TextInput</Text>}

      <TextInput
        multiline={multiline}
        numberOfLines={3}
        onChangeText={handleChange}
        value={value}
        style={{ maxWidth: "88%" }}
        className="py-4 w-full text-[18px] text-gray-700 px-3"
        placeholder="Type a word here"
      />

      {icon && <View className="absolute right-3">{icon}</View>}
    </View>
  );
};

export default InputField;
