import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { object } from "yup";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { UPDATE_NAME } from "../../store/user";

import useCheckUserExists from "../../hooks/check-user-exists";
import { useHttpRequest } from "../../hooks/http-request";

import EditProfile from "../../containers/EditProfileContainer";
import { Input, InputVariantTypes } from "../../components/form-elements/Input";
import RoundedButton, {
  RoundedButtonVariantTypes,
} from "../../components/buttons/RoundedButton";

import { nameSchema } from "../../constants/input-schemas";

interface Props {
  navigation: any;
}

const EditName: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {checkUserExists} = useCheckUserExists();
  const {sendRequest} = useHttpRequest();

  const [serverResponseMessage, setServerResponseMessage] = useState("");

  const userState = useSelector((state: RootState) => state.user);
  const inputValidationSchema = object({
    name: nameSchema,
  });

  const changeNameButtonHandler = async (values: { name: string }, actions: FormikHelpers<any>) => {
    const {response, responseData} = await sendRequest({
      url: "/users/modify/name",
      method: "PATCH",
      body: JSON.stringify({
        newName: values.name.toLowerCase(),
      }),
    });

    console.log(responseData);

    if (response.status === 200) {
      setServerResponseMessage("Nom modifié.");
    }

    if (response.status === 400) {

      if (responseData.sameNames) {
        actions.setFieldError('name', "Votre nouveau nom ne peut pas être identique à l'actuel.")
      } else if (responseData.format) {
        actions.setFieldError('name', "Mauvais format.")
      }
      return;
    }

    dispatch(
      UPDATE_NAME({
        name: responseData.newName,
      })
    );
  };

  return (
    <EditProfile
      navigation={props.navigation}
      title={"Modifier Nom"}
      responseMessage={serverResponseMessage}
      setResponseMessage={setServerResponseMessage}
    >
      <Formik
        initialValues={{name: ""}}
        onSubmit={(values, actions) => changeNameButtonHandler(values, actions)}
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
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </EditProfile>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
  },
});

export default EditName;
