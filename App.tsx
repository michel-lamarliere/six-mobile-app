import React from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import Homepage from './views/Homepage/Homepage';
import Login from './views/Forms/LogIn';

import Colors from './constants/colors';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Semi-Bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return <View></View>;
	}

	const Stack = createNativeStackNavigator();

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={'light-content'} />
			<SafeAreaView style={styles.safeAreaView}></SafeAreaView>
			<SafeAreaView style={styles.safeAreaView2}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name='Homepage' component={Homepage} />
						<Stack.Screen name='LogIn' component={Login} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 0,
		backgroundColor: Colors.purple1,
	},
	safeAreaView2: {
		flex: 1,
		backgroundColor: Colors.black,
	},
});
