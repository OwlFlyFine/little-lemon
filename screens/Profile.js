import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import FormInput from "../components/FormInput";
import HeaderTitle from "../components/HeaderTitle";
import Checkbox from "../components/Checkbox";
import PageHeader from "../components/PageHeader";
import { getItem, setItem, clear } from "../utils/asyncStorage";
import { Context as AuthContext } from "../contexts/authContext";

const Profile = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState({
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

  const handleFirstName = (text) => setUser({ ...user, firstName: text });
  const handleLastName = (text) => setUser({ ...user, lastName: text });
  const handleEmail = (text) => setUser({ ...user, email: text });
  const handlePhoneNumber = (text) => setUser({ ...user, phoneNumber: text });

  const storeUserInfo = async (value) => {
    try {
      await setItem("UserInfo", value);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (key) => {
    try {
      const jsonValue = await getItem(key);
      setUser({
        firstName: jsonValue.firstName,
        lastName: jsonValue.lastName,
        email: jsonValue.email,
        phoneNumber: jsonValue.phoneNumber,
        profilePicture: jsonValue.profilePicture,
      });
      setEmailOrderStatuses(jsonValue.emailOrderStatuses);
      setEmailPasswordChanges(jsonValue.emailPasswordChanges);
      setEmailSpecialOffers(jsonValue.emailSpecialOffers);
      setEmailNewsletter(jsonValue.emailNewsletter);
    } catch (e) {
      console.error(e);
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
      setUser({ ...user, profilePicture: result.assets[0].uri });
    }
  };

  const handleLogout = () => {
    clear();
    logout();
  };

  useEffect(() => {
    getUserInfo("UserInfo");
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
            userName={user.firstName + user.lastName}
            size={80}
            src={user.profilePicture}
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
          value={user.firstName}
          onChangeText={handleFirstName}
        />
        <FormInput
          title="Last Name"
          placeholder="Enter your last name"
          value={user.lastName}
          onChangeText={handleLastName}
        />
        <FormInput
          title="Email"
          placeholder="Enter your email"
          value={user.email}
          onChangeText={handleEmail}
        />
        <FormInput
          isEmail
          title="Phone Number"
          placeholder="Enter your phone number"
          value={user.phoneNumber}
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
          onPress={() => handleLogout()}>
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
                ...user,
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
