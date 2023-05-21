import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../utils/database";
import { useUpdateEffect } from "../utils/utils";
import { getItem } from "../utils/asyncStorage";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["Starters", "Mains", "Desserts", "Drinks"];

const Item = ({ name, price, description, image, category }) => (
  <View style={styles.item}>
    <View style={styles.itemContainer}>
      <View style={styles.menu}>
        <Text style={[styles.cardTitle, { fontWeight: 600, marginBottom: 0 }]}>
          {name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[styles.paragraph, { color: colors.black }]}>
          {description}
        </Text>
        <Text style={[styles.paragraph, { color: colors.black }]}>
          ${price}
        </Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
        style={styles.menuPicture}
      />
    </View>
  </View>
);

const Home = () => {
  const navigation = useNavigation();

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
      const jsonValue = await getItem(key);
      setUserInfo({
        firstName: jsonValue.firstName,
        lastName: jsonValue.lastName,
        email: jsonValue.email,
        phoneNumber: jsonValue.phoneNumber,
        profilePicture: jsonValue.profilePicture,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      return json.menu.map((menu) => ({
        name: menu.name,
        price: menu.price,
        description: menu.description,
        image: menu.image,
        category: menu.category,
      }));
    } catch (error) {
      return [];
    }
  };

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  useEffect(() => {
    getUserInfo("UserInfo");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          menuItems = await fetchData();
          menuItems.map((item) => saveMenuItems(item));
        }
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });

      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <UserAvatar
              userName={userInfo.firstName + userInfo.lastName}
              size={40}
              src={userInfo.profilePicture}
            />
          </TouchableOpacity>
        }
      />
      <Hero
        handleSearchChange={handleSearchChange}
        searchBarText={searchBarText}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        keyExtractor={({ item, index }) => index}
        ItemSeparatorComponent={
          <View
            style={{
              height: 1,
              width: "100%",
              marginVertical: 6,
              backgroundColor: colors.highlight,
            }}
          />
        }
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
