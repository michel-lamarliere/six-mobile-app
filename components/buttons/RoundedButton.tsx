import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";
import Colors from "../../constants/colors";

export enum RoundedButtonVariantTypes {
  DEFAULT = "DEFAULT",
  EDIT_PROFILE = "EDIT_PROFILE",
}

interface CommonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | any;
  variant?: RoundedButtonVariantTypes;
}

type ConditionalProps =
  | {
      variant?: RoundedButtonVariantTypes.DEFAULT;
      buttonStyle: TextStyle;
      textStyle: TextStyle;
    }
  | {
      variant?: RoundedButtonVariantTypes.EDIT_PROFILE;
      buttonStyle?: never;
      textStyle?: never;
    };

type Props = CommonProps & ConditionalProps;

const RoundedButton: React.FC<Props> = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.container,
        props.buttonStyle,
        pressed && styles.pressed,
        props.variant === RoundedButtonVariantTypes.EDIT_PROFILE &&
          styles.editProfileContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          props.textStyle,
          props.variant === RoundedButtonVariantTypes.EDIT_PROFILE &&
            styles.editProfileText,
        ]}
      >
        {props.text}
      </Text>
      {props.children}
    </Pressable>
  );
};

RoundedButton.defaultProps = {
  variant: RoundedButtonVariantTypes.DEFAULT,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 37,
    backgroundColor: "white",
  },
  editProfileContainer: {
    backgroundColor: Colors.main,
    marginTop: 60,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
  editProfileText: {
    color: Colors.main2,
  },
});

export default RoundedButton;
