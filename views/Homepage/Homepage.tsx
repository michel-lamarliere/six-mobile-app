import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';

import RoundedButton from '../../components/buttons/RoundedButton';
import CarouselSlides from './CarouselSlides';

import Colors from '../../constants/colors';

interface Props {
	navigation: any;
}

const Homepage: React.FC<Props> = (props) => {
	return (
		<View style={styles.wrapper}>
			<ImageBackground
				source={require('../../assets/backgrounds/mobile-bg.png')}
				style={styles.backgroundImage}
			>
				<CarouselSlides />
				<View style={styles.buttons}>
					<RoundedButton
						text={'Se connecter'}
						onPress={() => {
							props.navigation.navigate('LogIn');
						}}
						buttonStyle={styles.logInButton}
						textStyle={styles.logInButtonText}
					/>
					<RoundedButton
						text={"S'inscrire"}
						onPress={() => {
							props.navigation.navigate('SignUp');
						}}
						buttonStyle={styles.signUpButton}
						textStyle={styles.signUpButtonText}
					/>
					<Text style={styles.contactButton}>Nous contacter</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: Colors.purple1,
	},
	backgroundImage: {
		bottom: -5,
		flex: 1,
	},
	buttons: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	logInButton: {
		backgroundColor: Colors.white,
		marginBottom: 26,
		width: 150,
	},
	logInButtonText: {
		color: Colors.purple1,
	},
	signUpButton: {
		backgroundColor: Colors.purple1,
		marginBottom: 35,
		width: 150,
	},
	signUpButtonText: {
		color: Colors.white,
	},
	contactButton: {
		marginBottom: 20,
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		textDecorationLine: 'underline',
		color: Colors.white,
	},
});

export default Homepage;
