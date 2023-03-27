import React from "react";
import { Text } from "react-native";

import { styles } from "../styles/styles";

const HeaderTitle = ({ title }) => {
  return <Text style={styles.cardTitle}>{title}</Text>;
};

export default HeaderTitle;
