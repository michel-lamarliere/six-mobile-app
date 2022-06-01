import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

import Colors from '../../constants/colors';

interface Props {
	title: string;
	img: ImageSourcePropType;
}

export const Slide2GridItem: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<Image source={props.img} style={styles.img2} />
			<Text style={styles.title}>{props.title}</Text>
		</View>
	);
};

export const Slide3GridItem: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<Image source={props.img} style={styles.img3} />
			<Text style={[styles.title, styles.title3]}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '33%',
		marginTop: 20,
	},
	title: {
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: Colors.white,
		marginTop: 10,
	},
	title3: { marginTop: 38, textAlign: 'center' },
	img2: {
		width: 30,
		height: 30,
	},
	img3: {
		width: 50,
		height: 50,
		overflow: 'visible',
	},
});
