import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import FormInput from "../components/FormInput";
import HeaderTitle from "../components/HeaderTitle";
import Checkbox from "../components/Checkbox";
import PageHeader from "../components/PageHeader";

const Profile = () => {
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

  return (
    <View style={styles.container}>
      <PageHeader
        leftNode={
          <TouchableOpacity onPress={() => undefined}>
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
        rightNode={
          <Image
            source={require("../assets/images/Profile.png")}
            style={styles.headerImage}
          />
        }
      />
      <View style={styles.form}>
        <HeaderTitle title="Personal Information" />
        <View>
          <Text>Avatar</Text>
          <Image
            source={require("../assets/images/Profile.png")}
            style={styles.logo}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}>
            <TouchableOpacity style={styles.button} onPress={() => undefined}>
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => undefined}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
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
          onPress={() => undefined}>
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
            onPress={() => undefined}>
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
