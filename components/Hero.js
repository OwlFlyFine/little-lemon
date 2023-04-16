import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const Hero = ({ handleSearchChange, searchBarText }) => {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.heroBottomContainer}>
        <View flex="2" gap="10">
          <Text style={styles.subTitle}>Chicago</Text>
          <Text style={styles.paragraph}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <View flex="1" style={styles.heroImageContainer}>
          <Image
            source={require("../assets/images/HeroImage.png")}
            style={styles.heroImage}
          />
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: "white" }}
        elevation={0}
      />
    </View>
  );
};

export default Hero;
