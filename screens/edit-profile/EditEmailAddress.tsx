import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { object, string } from "yup";

import { RootState } from "../../store/store";

import { useHttpRequest } from "../../hooks/http-request";

import { Input, InputVariantTypes } from "../../components/form-elements/Input";
import EditProfileContainer from "../../containers/EditProfileContainer";
import RoundedButton, {
  RoundedButtonVariantTypes,
} from "../../components/buttons/RoundedButton";
import Colors from "../../constants/colors";

interface Props {
  navigation: any;
}

const EditEmailAddress: React.FC<Props> = (props) => {
  const { sendRequest } = useHttpRequest();

  const userState = useSelector((state: RootState) => state.user);

  const [serverResponseMessage, setServerResponseMessage] = useState("");

  const handleServerResponse = (responseData: any, actions: any) => {
    if (!responseData) {
      return;
    }

    if (responseData.used) {
      actions.setFieldError(
        "emailAddress",
        "Adresse mail déjà utilisée, veuillez en choisir une autre."
      );
    }
  };

  const changeEmailAddressHandler = async (values: {
    emailAddress: string;
  }) => {
    const { response, responseData } = await sendRequest({
      url: `/users/modify/email-address`,
      method: "PATCH",
      body: JSON.stringify({
        emailAddress: values.emailAddress,
      }),
    });

    if (response.status === 200) {
      setServerResponseMessage(
        "Emails envoyés, veuillez consulter vos boîtes mail."
      );
    }
  };

  const validationSchema = object({
    emailAddress: string()
      .required("Champ obligatoire.")
      .email("Format invalide.")
      .notOneOf(
        [userState.emailAddress],
        "La nouvelle adresse mail ne peut pas être identique à l'actuelle."
      ),
  });

  return (
    <EditProfileContainer
      title={"Adresse mail"}
      navigation={props.navigation}
      responseMessage={serverResponseMessage}
      setResponseMessage={setServerResponseMessage}
    >
      <Formik
        initialValues={{ emailAddress: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          changeEmailAddressHandler(values).then((responseData) => {
            handleServerResponse(responseData, actions);
          })
        }
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.text}>
              <Text style={styles.emailLabel}>Adresse mail actuelle :</Text>
              <Text style={styles.email}>{userState.emailAddress}</Text>
            </View>
            <Input
              variant={InputVariantTypes.EDIT_PROFILE}
              value={values.emailAddress}
              errorText={errors.emailAddress}
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              touched={touched.emailAddress}
              placeholder={"alicia@email.com"}
              style={styles.input}
            />
            <RoundedButton
              onPress={handleSubmit}
              variant={RoundedButtonVariantTypes.EDIT_PROFILE}
            />
          </View>
        )}
      </Formik>
    </EditProfileContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
  },
  text: {
    marginTop: 40,
    alignSelf: "flex-start",
  },
  emailLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.accent4,
  },
  email: {
    marginTop: 8,
    fontFamily: "Poppins-Semi-Bold",
    fontSize: 16,
    color: Colors.main2,
  },
  input: {
    marginTop: 24,
  },
});

export default EditEmailAddress;
