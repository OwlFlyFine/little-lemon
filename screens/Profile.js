import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import FormInput from "../components/FormInput";
import HeaderTitle from "../components/HeaderTitle";
import Checkbox from "../components/Checkbox";
import PageHeader from "../components/PageHeader";

const Profile = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [emailOrderStatuses, setEmailOrderStatuses] = useState(false);
  const [emailPasswordChanges, setEmailPasswordChanges] = useState(false);
  const [emailSpecialOffers, setEmailSpecialOffers] = useState(false);
  const [emailNewsletter, setEmailNewsletter] = useState(false);

  const handleFirstName = (text) =>
    setUserInfo({ ...userInfo, firstName: text });
  const handleLastName = (text) => setUserInfo({ ...userInfo, lastName: text });
  const handleEmail = (text) => setUserInfo({ ...userInfo, email: text });
  const handlePhoneNumber = (text) =>
    setUserInfo({ ...userInfo, phoneNumber: text });

  const clearUserInfo = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  const storeUserInfo = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userInfo", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo({ ...userInfo, profilePicture: result.assets[0].uri });
    }
  };

  useEffect(() => {
    getUserInfo("onboard");
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        leftNode={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={32}
              color={colors.primary1}
            />
          </TouchableOpacity>
        }
        logo={
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
        }
        rightNode={null}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
        <HeaderTitle title="Personal Information" />
        <View
          style={{
            gap: 4,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 10,
          }}>
          <Text>Avatar</Text>
          <UserAvatar
            userName={userInfo.firstName + userInfo.lastName}
            size={80}
            src={userInfo.profilePicture}
          />
          <TouchableOpacity
            style={[styles.button, { height: 30, width: 100 }]}
            onPress={() => pickImage()}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
        <FormInput
          title="First Name"
          placeholder="Enter your first name"
          value={userInfo.firstName}
          onChangeText={handleFirstName}
        />
        <FormInput
          title="Last Name"
          placeholder="Enter your last name"
          value={userInfo.lastName}
          onChangeText={handleLastName}
        />
        <FormInput
          title="Email"
          placeholder="Enter your email"
          value={userInfo.email}
          onChangeText={handleEmail}
        />
        <FormInput
          isEmail
          title="Phone Number"
          placeholder="Enter your phone number"
          value={userInfo.phoneNumber}
          onChangeText={handlePhoneNumber}
        />
        <HeaderTitle title="Email Notifications" />
        <View>
          <Checkbox
            value={emailOrderStatuses}
            onValueChange={setEmailOrderStatuses}
            detail="Order statuses"
          />
          <Checkbox
            value={emailPasswordChanges}
            onValueChange={setEmailPasswordChanges}
            detail="Password changes"
          />
          <Checkbox
            value={emailSpecialOffers}
            onValueChange={setEmailSpecialOffers}
            detail="Special offers"
          />
          <Checkbox
            value={emailNewsletter}
            onValueChange={setEmailNewsletter}
            detail="Email newsletter"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primary2, marginBottom: 10 },
          ]}
          onPress={() => clearUserInfo()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.fixToButton}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                flex: 1,
                borderWidth: 1,
                borderColor: colors.primary1,
                backgroundColor: colors.white,
                height: 40,
              },
            ]}
            onPress={() => undefined}>
            <Text style={[styles.buttonText, { color: colors.primary1 }]}>
              Discard changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { flex: 1, height: 40 }]}
            onPress={() =>
              storeUserInfo({
                ...userInfo,
                emailOrderStatuses,
                emailPasswordChanges,
                emailSpecialOffers,
                emailNewsletter,
              })
            }>
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
