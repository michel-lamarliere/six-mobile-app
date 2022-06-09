import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import {
	createNavigationContainerRef,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';

import store, { RootState } from './store/store';

import Homepage from './screens/Homepage/Homepage';
import Login from './screens/Forms/LogIn';
import SignUp from './screens/Forms/SignUp';
import DailyView from './screens/views/DailyView';
import WeeklyView from './screens/views/WeeklyView';
import MonthlyView from './screens/views/MonthlyView';
import Profile from './screens/Profile/Profile';

import Colors from './constants/colors';
import { useUserClass } from './classes/user-class';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Unauthenticated = () => {
	return (
		<>
			<SafeAreaView style={styles.safeAreaTop}></SafeAreaView>
			<SafeAreaView style={styles.safeAreaBottom}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Homepage' component={Homepage} />
					<Stack.Screen name='LogIn' component={Login} />
					<Stack.Screen name='SignUp' component={SignUp} />
				</Stack.Navigator>
			</SafeAreaView>
		</>
	);
};

const Authenticated = () => {
	return (
		<SafeAreaView style={styles.safeAreaAuthenticated}>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: styles.tabBarStyle,
					tabBarLabelStyle: styles.tabBarLabelStyle,
					tabBarActiveTintColor: Colors.accent2,
					tabBarInactiveTintColor: Colors.accent4,
				}}
			>
				<Tab.Screen
					name='DailyView'
					component={DailyView}
					options={{ title: 'Daily' }}
				/>
				<Tab.Screen
					name='WeeklyView'
					component={WeeklyView}
					options={{ title: 'Weekly' }}
				/>
				<Tab.Screen
					name='MonthlyView'
					component={MonthlyView}
					options={{ title: 'Monthly' }}
				/>
				<Tab.Screen name='Profile' component={Profile} />
			</Tab.Navigator>
		</SafeAreaView>
	);
};

const Navigation = () => {
	const User = useUserClass();

	useEffect(() => {
		setTimeout(() => {
			User.autoLogIn();
		}, 100);
	}, []);

	return (
		<SafeAreaProvider>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Unauthenticated' component={Unauthenticated} />
				<Stack.Screen name='Authenticated' component={Authenticated} />
			</Stack.Navigator>
		</SafeAreaProvider>
	);
};

const App = () => {
	const [fontsLoaded] = useFonts({
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Medium-Italic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
		'Poppins-Semi-Bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Semi-Bold-Italic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Extra-Bold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
	});

	if (!fontsLoaded) {
		return <View></View>;
	}

	return (
		<Provider store={store}>
			<StatusBar barStyle={'light-content'} />
			<NavigationContainer>
				<Navigation />
			</NavigationContainer>
		</Provider>
	);
};

const styles = StyleSheet.create({
	safeAreaTop: {
		flex: 0,
		backgroundColor: Colors.main,
	},
	safeAreaBottom: {
		flex: 1,
		backgroundColor: Colors.main3,
	},
	safeAreaAuthenticated: {
		flex: 1,
		backgroundColor: Colors.main3,
	},
	tabBarStyle: {
		backgroundColor: Colors.main3,
	},
	tabBarActiveTintColor: {
		color: Colors.accent,
	},
	tabBarLabelStyle: {
		fontSize: 14,
	},
});

export default App;
