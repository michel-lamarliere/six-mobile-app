import React, { useLayoutEffect, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";

import { useUserClass } from "../../classes/user";
import { useHttpRequest } from "../../hooks/http-request";

import { Input } from "../../components/form-elements/Input";
import FormContainer from "../../containers/LogInSignUpFormContainer";
import RoundedButton from "../../components/buttons/RoundedButton";

import Colors from "../../constants/colors";

interface Props {
  navigation: any;
}

interface LogInErrorResponseData {
  validInputs: {
    emailAddress: boolean;
    password: boolean;
  };
}

interface LogInInputs {
  emailAddress: string;
  password: string;
}

const LogIn: React.FC<Props> = (props) => {
  const User = useUserClass();
  const { sendRequest } = useHttpRequest();

  const [rememberEmailAddress, setRememberEmailAddress] = useState(false);
  const [rememberedEmailAddress, setRememberedEmailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [serverResponseMessage, setServerResponseMessage] = useState("");

  let logInSchema = object({
    emailAddress: string().required("Champ obligatoire."),
    password: string().required("Champ obligatoire."),
  });

  const serverInputErrorsHandler = (
    responseData: LogInErrorResponseData,
    actions: FormikHelpers<LogInInputs>
  ) => {
    if (!responseData) {
      return;
    }

    if (!responseData.validInputs.emailAddress) {
      actions.setFieldError("emailAddress", "Email introuvable.");
    } else if (!responseData.validInputs.password) {
      actions.setFieldError("password", "Mot de passe incorrect.");
    }
  };

  const submitHandler = async (values: {
    emailAddress: string;
    password: string;
  }): Promise<LogInErrorResponseData | void> => {
    const { response, responseData } = await sendRequest({
      url: "/users/sign-in",
      method: "POST",
      body: JSON.stringify({
        emailAddress: values.emailAddress,
        password: values.password,
      }),
    });

    if (response.status === 200 && !responseData.validInputs) {
      if (rememberEmailAddress) {
        await AsyncStorage.setItem("remembered-email", values.emailAddress);
      } else if (!rememberEmailAddress && rememberedEmailAddress.length > 0) {
        await AsyncStorage.removeItem("remembered-email");
      }

      User.logIn(responseData);
    }

    if (response.status === 400) {
      return responseData;
    }
  };

  const getRememberedEmailAddress = async () => {
    const rememberedEmail = await AsyncStorage.getItem("remembered-email");

    if (rememberedEmail) {
      setRememberedEmailAddress(rememberedEmail);
      setRememberEmailAddress(true);
    }

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    getRememberedEmailAddress();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FormContainer
      headerTitle={"Vous revoilà !"}
      footerText={"Pas de compte ?"}
      footerTextLink={"Inscrivez-vous !"}
      switchFormHandler={() => props.navigation.replace("SignUp")}
      responseMessage={serverResponseMessage}
      setResponseMessage={setServerResponseMessage}
    >
      <Formik
        initialValues={{ emailAddress: rememberedEmailAddress, password: "" }}
        validationSchema={logInSchema}
        onSubmit={(
          values: LogInInputs,
          actions: FormikHelpers<LogInInputs>
        ) => {
          submitHandler(values).then((responseData) => {
            if (responseData) {
              serverInputErrorsHandler(responseData, actions);
            }
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Input
              placeholder={"Adresse mail"}
              value={values.emailAddress}
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              touched={touched.emailAddress}
              errorText={errors.emailAddress}
            />
            <Input
              style={styles.passwordInput}
              placeholder={"Mot de passe"}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              touched={touched.password}
              errorText={errors.password}
              secureTextEntry={true}
            />
            <Pressable onPress={() => setRememberEmailAddress((prev) => !prev)}>
              <View style={styles.checkboxContainer}>
                <Image
                  source={
                    rememberEmailAddress
                      ? require("../../assets/icons/forms-inputs/remember-me_true.png")
                      : require("../../assets/icons/forms-inputs/remember-me_false.png")
                  }
                  width={25}
                  height={25}
                />
                <Text style={styles.checkboxText}>Se souvenir de moi</Text>
              </View>
            </Pressable>
            <RoundedButton
              text={"Connexion"}
              buttonStyle={styles.submitButton}
              textStyle={styles.submitButtonText}
              onPress={
                handleSubmit as () => void as (
                  event: GestureResponderEvent
                ) => void
              }
            />
          </>
        )}
      </Formik>
      <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  passwordInput: {
    marginTop: 14,
  },
  checkboxContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: Colors.accent,
  },
  submitButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  submitButtonText: {
    color: Colors.main,
  },
  forgotPassword: {
    marginTop: 110,
    textAlign: "center",
    fontFamily: "Poppins-Medium-Italic",
    fontSize: 14,
    color: Colors.accent,
    textDecorationLine: "underline",
  },
});

export default LogIn;
