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
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Homepage' component={Homepage} />
			<Stack.Screen name='LogIn' component={Login} />
			<Stack.Screen name='SignUp' component={SignUp} />
		</Stack.Navigator>
	);
};

const Authenticated = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
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
	);
};

const Navigation = () => {
	const userState = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState(true);

	const User = useUserClass();

	const authentication = async () => {
		await User.autoLogIn();
		setIsLoading(false);
	};

	useEffect(() => {
		authentication();
	}, []);

	// if (isLoading) {
	// 	return <Text>Hello</Text>;
	// }

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Homepage' component={Homepage} />
				<Stack.Screen name='LogIn' component={Login} />
				<Stack.Screen name='SignUp' component={SignUp} />
				<Stack.Screen name='Authenticated' component={Authenticated} />
			</Stack.Navigator>

			{/* {userState.token && <Authenticated />} */}
			{/* {!userState.token && <Unauthenticated />} */}
		</>
	);
};

const App = () => {
	const [fontsLoaded] = useFonts({
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Medium-Italic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
		'Poppins-Semi-Bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Extra-Bold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
	});

	if (!fontsLoaded) {
		return <View></View>;
	}

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar barStyle={'light-content'} />
				<SafeAreaView style={styles.safeAreaView}>
					{/* <SafeAreaView style={styles.safeAreaView2}> */}
					<NavigationContainer>
						<Navigation />
					</NavigationContainer>
					{/* </SafeAreaView> */}
				</SafeAreaView>
			</SafeAreaProvider>
		</Provider>
	);
};

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: Colors.main,
		// position: 'absolute',
	},
});

export default App;
