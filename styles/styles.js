import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  hero: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.primary1,
  },
  heroBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroImage: {
    color: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  heroImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginLeft: 4,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  heroImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderRadius: 16,
  },
  form: {
    marginTop: 20,
  },
  formText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.disabled,
    marginBottom: 2,
  },
  input: {
    height: 50,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: "#23a8d9",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  title: {
    fontSize: 64,
    fontWeight: 500,
    fontFamily: "MarkaziText-Regular",
    color: colors.primary2,
  },
  subTitle: {
    fontSize: 40,
    fontWeight: 300,
    fontFamily: "MarkaziText-Regular",
    color: colors.white,
  },
  paragraph: {
    fontSize: 16,
    color: colors.white,
    fontFamily: "Karla-Regular",
  },
});
