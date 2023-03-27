import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../styles/styles";

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleValidation = () => {
    if (firstName.length > 0 && validateEmail(email)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("onboard", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnboardingComplete = () => {
    storeData({ firstName, email, isOnboardingCompleted: true });
    navigation.navigate("Profile", { firstName, email });
  };

  useEffect(() => {
    handleValidation();
  }, [firstName, email]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.hero}>
        <Text style={styles.title}>Little Lemon</Text>
        <View style={styles.heroBottomContainer}>
          <View flex="2">
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
      </View>
      <View style={styles.form}>
        <Text style={styles.formText}>First Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          maxLength={30}
          autoCapitalize="words"
        />
        <Text style={styles.formText}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, !valid && styles.disabledButton]}
          onPress={() => handleOnboardingComplete()}
          disabled={!valid}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
