import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAvatar from "@muhzi/react-native-user-avatar";

import { styles } from "../styles/styles";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });

  const getUserInfo = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const parse = JSON.parse(jsonValue);
      setUserInfo({
        ...userInfo,
        firstName: parse.firstName,
        email: parse.email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo("onboard");
  }, []);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <PageHeader
        logo={
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
        }
        rightNode={
          <UserAvatar
            userName={userInfo.firstName + userInfo.lastName}
            size={40}
            src={userInfo.profilePicture}
          />
        }
      />
      <Hero />
    </SafeAreaView>
  );
};

export default Home;
