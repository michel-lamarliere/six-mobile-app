import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';

import RoundedButton from '../../components/buttons/RoundedButton';
import CarouselButton from './CarouselButton';
import { Slide2GridItem, Slide3GridItem } from './CarouselGridItems';

import Colors from '../../constants/colors';

interface Props {
	navigation: any;
}

const Homepage: React.FC<Props> = (props) => {
	const [carouselIndex, setCarouselIndex] = useState(0);

	const carouselHandler = (number: number) => {
		setCarouselIndex(number);
	};

	const carousel = [
		<View key={'carousel-1'}>
			<Text style={styles.carouselQuestion}>
				C'est quoi{'  '}
				<Image
					source={require('../../assets/icons/app/logo.png')}
					width={10}
					height={10}
				/>
				{'  '}?
			</Text>
			<Text style={styles.carouselAnswer}>
				Une appli qui vous aide à avoir une vie saine et équilibrée.
			</Text>
			<Text style={styles.carouselQuestion}>Comment ?</Text>
			<Text style={styles.carouselAnswer}>
				En essayant d’accomplir nos six objectifs chaque jour.{'\n'} {'\n'}Ces 6
				objectifs facilitent la mise en place d’une routine. Ils sont la base
				d’une vie équilibrée.
			</Text>
		</View>,
		<View>
			<Text style={styles.carouselTitle}>Nos six objectifs journaliers :</Text>
			<View style={styles.carouselGrid}>
				<Slide2GridItem
					title={'Alimentation'}
					img={require('../../assets/icons/six/nutrition.png')}
				/>
				<Slide2GridItem
					title={'Sommeil'}
					img={require('../../assets/icons/six/sleep.png')}
				/>
				<Slide2GridItem
					title={'Sport'}
					img={require('../../assets/icons/six/sports.png')}
				/>
				<Slide2GridItem
					title={'Relaxation'}
					img={require('../../assets/icons/six/relaxation.png')}
				/>
				<Slide2GridItem
					title={'Projets'}
					img={require('../../assets/icons/six/projects.png')}
				/>
				<Slide2GridItem
					title={'Vie Sociale'}
					img={require('../../assets/icons/six/social_life.png')}
				/>
			</View>
		</View>,
		<View>
			<Text style={styles.carouselTitle}>Comment atteindre un objectif ?</Text>
			<Text style={styles.carouselDescription}>
				Il suffit de cliquer jusqu’à obtenir le niveau accompli.
			</Text>
			<View style={styles.carouselGrid}>
				<Slide3GridItem
					title={'Atteint'}
					img={require('../../assets/icons/tutorial/tutorial-full.png')}
				/>
				<Slide3GridItem
					title={'Presque atteint'}
					img={require('../../assets/icons/tutorial/tutorial-half.png')}
				/>
				<Slide3GridItem
					title={'Non atteint'}
					img={require('../../assets/icons/tutorial/tutorial-empty.png')}
				/>
			</View>
			<Text style={styles.carouselLink}>En savoir plus</Text>
		</View>,
	];

	return (
		<View style={styles.wrapper}>
			<ImageBackground
				source={require('../../assets/backgrounds/mobile-bg.png')}
				style={styles.backgroundImage}
			>
				<View style={styles.carousel}>{carousel[carouselIndex]}</View>
				<View style={styles.carouselButtons}>
					<CarouselButton
						active={carouselIndex === 0}
						onPress={() => setCarouselIndex(0)}
					/>
					<CarouselButton
						active={carouselIndex === 1}
						onPress={() => setCarouselIndex(1)}
					/>
					<CarouselButton
						active={carouselIndex === 2}
						onPress={() => setCarouselIndex(2)}
					/>
				</View>
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
		width: '100%',
		height: '100%',
	},
	carousel: {
		paddingHorizontal: 40,
		paddingVertical: 40,
	},
	carouselButtons: {
		zIndex: 2,
		position: 'absolute',
		bottom: '33%',
		left: '50%',
		right: '50%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	carouselQuestion: {
		fontFamily: 'Poppins-Bold',
		fontSize: 18,
		color: Colors.white,
	},
	carouselAnswer: {
		marginTop: 20,
		marginBottom: 60,
		fontFamily: 'Poppins-Regular',
		fontSize: 14,
		color: Colors.white,
	},
	carouselTitle: {
		fontFamily: 'Poppins-Semi-Bold',
		fontSize: 16,
		color: Colors.white,
	},
	carouselDescription: {
		marginTop: 20,
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: Colors.white,
	},
	carouselGrid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		marginTop: 45,
	},
	carouselLink: {
		alignSelf: 'center',
		marginTop: 120,
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: Colors.lavender,
		textDecorationLine: 'underline',
	},
	buttons: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		// justifyContent: 'center',
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
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		textDecorationLine: 'underline',
		color: Colors.white,
	},
});

export default Homepage;
