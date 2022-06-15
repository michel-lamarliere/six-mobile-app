import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";

import { useHttpRequest } from "../../hooks/http-request";

import EditProfile from "../../containers/EditProfileContainer";
import RoundedButton, {
  RoundedButtonVariantTypes,
} from "../../components/buttons/RoundedButton";

import Colors from "../../constants/colors";
import { UPDATE_ICON } from "../../store/user";

interface Props {
  navigation: any;
}

const EditIcon: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpRequest();

  const userState = useSelector((state: RootState) => state.user);

  const [selectedIcon, setSelectedIcon] = useState<null | number>(null);
  const [serverResponseMessage, setServerResponseMessage] = useState("");

  const icons: ImageSourcePropType[] = [
    require("../../assets/icons/user/icon_0.png"),
    require("../../assets/icons/user/icon_1.png"),
    require("../../assets/icons/user/icon_2.png"),
    require("../../assets/icons/user/icon_3.png"),
    require("../../assets/icons/user/icon_4.png"),
    require("../../assets/icons/user/icon_5.png"),
    require("../../assets/icons/user/icon_6.png"),
    require("../../assets/icons/user/icon_7.png"),
    require("../../assets/icons/user/icon_8.png"),
    require("../../assets/icons/user/icon_9.png"),
    require("../../assets/icons/user/icon_10.png"),
    require("../../assets/icons/user/icon_11.png"),
  ];

  const editIconHandler = async () => {
    const { response, responseData } = await sendRequest({
      url: "/users/modify/icon",
      method: "PATCH",
      body: JSON.stringify({
        newIcon: selectedIcon,
      }),
    });

    if (response.status === 400) {
      setServerResponseMessage("Erreur lors de la modification de l'icône.");
      return;
    }

    if (response.status === 200) {
      dispatch(UPDATE_ICON({ icon: selectedIcon }));
      setSelectedIcon(null);
      setServerResponseMessage("Icône modifiée.");
    }
  };

  return (
    <EditProfile
      navigation={props.navigation}
      title={"Modifier Icône"}
      responseMessage={serverResponseMessage}
      setResponseMessage={setServerResponseMessage}
    >
      <View style={styles.wrapper}>
        {icons.map((icon, index) => (
          <Pressable
            key={`icon_${index}`}
            onPress={() => setSelectedIcon(index)}
            style={[
              styles.iconWrapper,
              index === selectedIcon && styles.selectedIconWrapper,
              index === userState.icon && styles.currentIconWrapper,
            ]}
          >
            <Image source={icon} style={styles.icon} />
          </Pressable>
        ))}
        <RoundedButton
          variant={RoundedButtonVariantTypes.EDIT_PROFILE}
          onPress={() => {
            editIconHandler();
          }}
        />
      </View>
    </EditProfile>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    margin: 4,
    borderWidth: 3,
    borderRadius: 70 / 2,
    borderColor: "transparent",
  },
  selectedIconWrapper: {
    borderColor: Colors.main2,
  },
  currentIconWrapper: {
    borderColor: Colors.main,
  },
  icon: {
    width: "85%",
    height: "85%",
  },
});

export default EditIcon;
