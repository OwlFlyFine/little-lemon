import React from "react";
import { View, Text, TextInput } from "react-native";

import { styles } from "../styles/styles";

const FormInput = ({
  title,
  value,
  placeholder,
  onChangeText,
  isEmail = false,
}) => {
  return (
    <View>
      <Text style={styles.formText}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        keyboardType={isEmail ? "phone-pad" : "default"}
        autoCapitalize={isEmail ? "none" : "words"}
      />
    </View>
  );
};

export default FormInput;
