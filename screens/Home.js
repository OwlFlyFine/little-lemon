import React, { useState, useEffect } from "react";
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

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import Filters from "../components/Filters";

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

  const handleFiltersChange = async (index) => {};

  useEffect(() => {
    getUserInfo("onboard");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // await createTable();
        // let menuItems = await getMenuItems();

        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        // if (!menuItems.length) {
        const menuItems = await fetchData();
        console.log(menuItems);
        // saveMenuItems(menuItems);
        // }
        setData(menuItems);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                firstName: userInfo.firstName,
                email: userInfo.email,
              })
            }>
            <UserAvatar
              userName={userInfo.firstName + userInfo.lastName}
              size={40}
              src={userInfo.profilePicture}
            />
          </TouchableOpacity>
        }
      />
      <Hero />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
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
