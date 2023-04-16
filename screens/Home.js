import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAvatar from "@muhzi/react-native-user-avatar";

import { styles } from "../styles/styles";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import Filters from "../components/Filters";

const API_URL = "";
const sections = ["Starters", "Mains", "Desserts", "Drinks"];

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

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

  const handleFiltersChange = async (index) => {};

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
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
    </SafeAreaView>
  );
};

export default Home;
