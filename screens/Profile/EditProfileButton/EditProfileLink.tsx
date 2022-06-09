import React from 'react';
import { Pressable, Text, View, Image, StyleSheet } from 'react-native';

import Colors from '../../../constants/colors';

interface Props {
	onPress: () => void;
	iconPath: any;
	text: string;
}

const EditProfileLink: React.FC<Props> = (props) => {
	return (
		<Pressable onPress={props.onPress}>
			<View style={styles.wrapper}>
				<Image source={props.iconPath} style={styles.icon} />
				<Text style={styles.text}>{props.text}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 14,
	},
	icon: {
		width: 26,
		height: 26,
	},
	text: {
		marginLeft: 11,
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
		color: Colors.accent4,
	},
});

export default EditProfileLink;
