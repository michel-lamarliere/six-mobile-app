import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/colors";

interface Props {
  headerTitle: string;
  footerText: string;
  footerTextLink: string;
  switchFormHandler: () => void;
  responseMessage: string;
  setResponseMessage: Dispatch<SetStateAction<string>>;
}

const LogInSignUpFormContainer: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const backButtonHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (props.responseMessage.length > 0) {
      const responseMessageTimeout = setTimeout(() => {
        props.setResponseMessage("");
      }, 5000);

      return () => {
        clearTimeout(responseMessageTimeout);
      };
    }
  }, [props.responseMessage]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={backButtonHandler} style={styles.backButton}>
            <Image
              source={require("../assets/icons/back-button.png")}
              style={styles.backButtonImage}
            />
          </Pressable>
          <Text style={styles.headerTitle}>{props.headerTitle}</Text>
        </View>
        <View style={styles.inputs}>{props.children}</View>
        <Text style={styles.responseMessage}>{props.responseMessage}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{props.footerText} </Text>
        <Pressable
          // onPress={() => navigation.navigate(props.switchFormHandler)}
          onPress={props.switchFormHandler}
          style={styles.footerButton}
        >
          <Text style={styles.footerButtonText}>{props.footerTextLink}</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 38,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: Colors.accent3,
  },
  backButtonImage: {
    width: 5,
    height: 10,
  },
  headerTitle: {
    fontFamily: "Poppins-Extra-Bold",
    fontSize: 24,
    color: Colors.accent,
  },
  inputs: {
    marginTop: 40,
  },
  responseMessage: {
    marginTop: 20,
    fontFamily: "Poppins-Semi-Bold",
    fontSize: 14,
    color: Colors.main2,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 90,
    backgroundColor: Colors.accent2,
  },
  footerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: Colors.main2,
  },
  footerButton: {},
  footerButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.main2,
    textDecorationLine: "underline",
  },
});

export default LogInSignUpFormContainer;
