import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { object } from "yup";

import { RootState } from "../../store/store";

import { nameSchema } from "../../constants/input-schemas";

import EditProfileContainer from "../../containers/EditProfileContainer";
import { Input, InputVariantTypes } from "../../components/form-elements/Input";
import RoundedButton, {
  RoundedButtonVariantTypes,
} from "../../components/buttons/RoundedButton";

import { BACKEND_API_URL } from "@env";
import { useSelector } from "react-redux";

interface Props {
  navigation: any;
}

const EditName: React.FC<Props> = (props) => {
  const userData = useSelector((state: RootState) => state.user);
  const inputValidationSchema = object({
    name: nameSchema,
  });

  const changeNameButtonHandler = async (values: { name: string }) => {
    console.log("click");
    console.log(userData.token);

    const response = await fetch(`${BACKEND_API_URL}/users/modify/name`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${userData.token}`,
      },
      body: JSON.stringify({
        newName: values.name,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);
  };

  return (
    <EditProfileContainer navigation={props.navigation} title={"Modifier Nom"}>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => changeNameButtonHandler(values)}
        validationSchema={inputValidationSchema}
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
            <Input
              errorText={errors.name}
              onBlur={handleBlur("name")}
              touched={touched.name}
              onChangeText={handleChange("name")}
              placeholder={"Alicia"}
              value={values.name}
              variant={InputVariantTypes.EDIT_PROFILE}
            />
            <RoundedButton
              variant={RoundedButtonVariantTypes.EDIT_PROFILE}
              text={"Enregistrer"}
              onPress={handleSubmit}
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
});

export default EditName;
