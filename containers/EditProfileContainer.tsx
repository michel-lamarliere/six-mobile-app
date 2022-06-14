import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";

interface Props {
  navigation: any;
  title: string;
}

const EditProfileContainer: React.FC<Props> = (props) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.backButton}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          source={require("../assets/icons/back-button.png")}
          style={styles.backButtonIcon}
        />
      </Pressable>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.main3,
    alignItems: "center",
  },
  backButton: {
    marginTop: 10,
    marginLeft: 36,
    alignSelf: "flex-start",
  },
  backButtonIcon: {},
  title: {
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.accent,
  },
  children: {
    width: "100%",
    paddingHorizontal: 25,
  },
});

export default EditProfileContainer;
