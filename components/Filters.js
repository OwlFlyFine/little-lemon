import React from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const Item = ({ item, index, onChange, selections }) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      onChange(index);
    }}
    style={{
      justifyContent: "center",
      alignItems: "center",
      padding: 8,
      marginRight: 8,
      marginVertical: 8,
      backgroundColor: selections[index] ? colors.primary1 : colors.highlight,
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
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);
const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filters}>
      <Text style={styles.cardTitle}>ORDER FOR DELIVERY!</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={sections}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              onChange={onChange}
              selections={selections}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Filters;
