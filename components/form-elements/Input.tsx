import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";

export enum InputVariantTypes {
  DEFAULT = "DEFAULT",
  EDIT_PROFILE = "EDIT_PROFILE",
}

interface Props {
  placeholder: string;
  value: string;
  touched: boolean | undefined;
  errorText: string | undefined;
  onChangeText: (text: string) => void;
  onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  variant?: InputVariantTypes;
  style?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

export const Input: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isInvalid = !!props.touched && !!props.errorText;

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={[
          styles.input,
          isInvalid && styles.invalid,
          props.variant === InputVariantTypes.EDIT_PROFILE &&
            styles.editProfile,
          props.variant === InputVariantTypes.DEFAULT && styles.default,
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={
          props.variant === InputVariantTypes.EDIT_PROFILE
            ? Colors.accent4
            : Colors.accent
        }
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        autoCapitalize={"none"}
        keyboardType={props.keyboardType}
        secureTextEntry={showPassword && props.secureTextEntry}
      />
      {props.secureTextEntry && (
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          <Text>{showPassword ? "Show Password" : "Hide Password"}</Text>
        </Pressable>
      )}
      {isInvalid && (
        <Text style={styles.errorMessage}>{isInvalid && props.errorText}</Text>
      )}
    </View>
  );
};

Input.defaultProps = {
  variant: InputVariantTypes.DEFAULT,
  keyboardType: "default",
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 50,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.main2,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
  },
  default: {
    backgroundColor: Colors.accent3,
  },
  editProfile: {
    backgroundColor: Colors.main4,
    marginTop: 60,
  },
  invalid: {
    borderColor: Colors.error,
  },
  errorMessage: {
    marginLeft: 1,
    marginTop: 2,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: Colors.error,
  },
});
