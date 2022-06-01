import React from 'react';
import { Pressable, StyleSheet, View, Text, GestureResponderEvent } from 'react-native';

import Colors from '../../constants/colors';

interface Props {
	active: boolean;
	onPress: (event: GestureResponderEvent) => void;
}

const CarouselButton: React.FC<Props> = (props) => {
	return (
		<Pressable style={styles.container} onPress={props.onPress}>
			<View style={[styles.button, props.active && styles.active]}></View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 14,
		height: 14,
		backgroundColor: 'transparent',
		marginHorizontal: 16,
	},
	button: {
		width: 14,
		height: 14,
		borderWidth: 1.5,
		borderRadius: 14 / 2,
		borderStyle: 'solid',
		borderColor: Colors.white,
	},
	active: {
		backgroundColor: Colors.lavender,
	},
});

export default CarouselButton;
