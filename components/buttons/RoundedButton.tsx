import React from 'react';
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	GestureResponderEvent,
	TextStyle,
} from 'react-native';

interface ButtonProps {
	text: string;
	buttonStyle: TextStyle;
	textStyle: TextStyle;
	onPress: (event: GestureResponderEvent) => void;
}

const RoundedButton: React.FC<ButtonProps> = (props) => {
	return (
		<Pressable
			onPress={props.onPress}
			style={({ pressed }) => [
				styles.container,
				props.buttonStyle,
				pressed && styles.pressed,
			]}
		>
			<Text style={[styles.text, props.textStyle]}>{props.text}</Text>
			{props.children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 180,
		height: 45,
		borderRadius: 37,
		backgroundColor: 'white',
	},
	pressed: {
		opacity: 0.75,
	},
	text: {
		fontSize: 15,
		fontFamily: 'Poppins-Bold',
	},
});

export default RoundedButton;
