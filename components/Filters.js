import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 10,
        borderBottomColor: colors.highlight,
        borderBottomWidth: 2,
      }}>
      <Text style={styles.cardTitle}>ORDER FOR DELIVERY!</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        {sections.map((section, index) => (
          <TouchableOpacity
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 1 / sections.length,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              marginRight: 8,
              marginVertical: 8,
              backgroundColor: selections[index]
                ? colors.primary1
                : colors.highlight,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: "white",
            }}>
            <View>
              <Text
                style={[
                  styles.paragraph,
                  {
                    fontWeight: "bold",
                    color: selections[index] ? colors.white : colors.primary1,
                  },
                ]}>
                {section}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Filters;
