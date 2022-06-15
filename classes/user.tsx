import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { LOG_USER_IN, LOG_USER_OUT } from "../store/user";

import UserType from "../types/user";

export const useUserClass = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<any>();

  class User {
    static async logIn(data: UserType) {
      const userJson = JSON.stringify(data);
      await AsyncStorage.setItem("user", userJson);

      dispatch(
        LOG_USER_IN({
          token: data.token,
          icon: data.icon,
          name: data.name,
          emailAddress: data.emailAddress,
          confirmedEmail: data.confirmedEmail,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabsScreens", key: "DailyView" }],
      });
    }

    static async autoLogIn() {
      const userRaw = await AsyncStorage.getItem("user");

      if (!userRaw) {
        return;
      }

      const user = JSON.parse(userRaw);

      dispatch(
        LOG_USER_IN({
          token: user.token,
          icon: user.icon,
          name: user.name,
          emailAddress: user.emailAddress,
          confirmedEmail: user.confirmedEmail,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabsScreens", key: "DailyView" }],
      });
    }

    static async logOut() {
      dispatch(LOG_USER_OUT());

      await AsyncStorage.removeItem("user");

      navigation.reset({
        index: 0,
        routes: [{ name: "Unauthenticated", key: "Homepage" }],
      });
    }

    static isUserLoggedIn(userState: UserType) {
      if (
        !userState.token ||
        typeof userState.icon !== "number" ||
        !userState.name ||
        !userState.emailAddress ||
        typeof userState.confirmedEmail === "boolean"
      ) {
        return false;
      }
      return true;
    }
  }

  return User;
};
