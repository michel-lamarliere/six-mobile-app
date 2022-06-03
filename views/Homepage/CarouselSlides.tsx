import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import CarouselButton from './CarouselButton';
import { Slide2GridItem, Slide3GridItem } from './CarouselGridItems';

import Colors from '../../constants/colors';

const CarouselSlides: React.FC = () => {
	return (
		<Swiper
			style={styles.carousel}
			dot={<CarouselButton active={false} />}
			activeDot={<CarouselButton active={true} />}
		>
			<View style={styles.carouselItem}>
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
					En essayant d’accomplir nos six objectifs chaque jour.{'\n'} {'\n'}Ces
					6 objectifs facilitent la mise en place d’une routine. Ils sont la
					base d’une vie équilibrée.
				</Text>
			</View>
			<View style={styles.carouselItem}>
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
			</View>
			<View style={styles.carouselItem}>
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
			</View>
		</Swiper>
	);
};

const styles = StyleSheet.create({
	carousel: {
		// flex: 2,
	},
	carouselItem: {
		marginHorizontal: 40,
		marginVertical: 40,
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
		marginTop: 20,
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: Colors.lavender,
		textDecorationLine: 'underline',
	},
});

export default CarouselSlides;
