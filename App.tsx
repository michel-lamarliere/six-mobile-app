import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SafeAreaView from "react-native-safe-area-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import store from "./store/store";

import { useUserClass } from "./classes/user";

import Homepage from "./screens/Homepage";
import Login from "./screens/Forms/LogIn";
import SignUp from "./screens/Forms/SignUp";
import DailyView from "./screens/views/Daily";
import WeeklyView from "./screens/views/Weekly";
import MonthlyView from "./screens/views/Monthly";
import Profile from "./screens/Profile";
import EditIcon from "./screens/edit-profile/EditIcon";
import EditName from "./screens/edit-profile/EditName";
import EditEmailAddress from "./screens/edit-profile/EditEmailAddress";

import Colors from "./constants/colors";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const Unauthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const BottomTabsScreens = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.main2,
        tabBarInactiveTintColor: Colors.accent,
      }}
    >
      <BottomTabs.Screen
        name="DailyView"
        component={DailyView}
        options={{ title: "Daily" }}
      />
      <BottomTabs.Screen
        name="WeeklyView"
        component={WeeklyView}
        options={{ title: "Weekly" }}
      />
      <BottomTabs.Screen
        name="MonthlyView"
        component={MonthlyView}
        options={{ title: "Monthly" }}
      />
      <BottomTabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: "Profile" }}
      />
    </BottomTabs.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditIcon" component={EditIcon} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="EditEmailAddress" component={EditEmailAddress} />
    </Stack.Navigator>
  );
};

const Navigation: React.FC = () => {
  const User = useUserClass();

  useEffect(() => {
    setTimeout(() => {
      User.autoLogIn();
    }, 100);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Unauthenticated" component={Unauthenticated} />
          <Stack.Screen
            name="BottomTabsScreens"
            component={BottomTabsScreens}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Medium-Italic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Semi-Bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Semi-Bold-Italic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Extra-Bold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.main3,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: Colors.accent2,
  },
  safeAreaAuthenticatedTop: {
    flex: 0,
    backgroundColor: Colors.main3,
  },
  safeAreaAuthenticatedBottom: {
    flex: 1,
    backgroundColor: Colors.accent2,
  },
  tabBarStyle: {
    backgroundColor: Colors.accent2,
    height: 60,
    paddingTop: 0,
    paddingBottom: 0,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    paddingBottom: 2,
  },
});

export default App;
