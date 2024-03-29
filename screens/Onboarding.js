import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

import { styles } from "../styles/styles";
import { getItem, setItem, clear } from "../utils/asyncStorage";
import { Context as AuthContext } from "../contexts/authContext";

const Onboarding = () => {
  const { onboard } = useContext(AuthContext);
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

  const handleOnboardingComplete = () => {
    onboard();
    setItem("OnboardingCompleted", true);
    setItem("UserInfo", {
      firstName: firstName,
      lastName: "",
      email: email,
      phoneNumber: "",
      profilePicture: "",
      emailOrderStatuses: false,
      emailPasswordChanges: false,
      emailSpecialOffers: false,
      emailNewsletter: false,
    });
    setFirstName("");
    setEmail("");
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
