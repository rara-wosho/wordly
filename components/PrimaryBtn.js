import { View, Text, TouchableOpacity } from "react-native";

const PrimaryBtn = ({ containerStyle, label }) => {
  return (
    <TouchableOpacity className="bg-primary-1">
      <Text className="text-white py-3 text-center">{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
