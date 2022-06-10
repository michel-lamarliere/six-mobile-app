import React from 'react';
import {
	Pressable,
	Text,
	View,
	Image,
	StyleSheet,
	ImageSourcePropType,
} from 'react-native';

import Colors from '../../../constants/colors';

interface Props {
	onPress: () => void;
	iconPath: ImageSourcePropType;
	text: string;
}

const EditProfileLink: React.FC<Props> = (props) => {
	return (
		<Pressable onPress={props.onPress}>
			{({ pressed }) => (
				<View style={styles.wrapper}>
					<Image
						source={props.iconPath}
						style={[styles.icon, pressed && styles.iconPressed]}
					/>
					<Text style={[styles.text, pressed && styles.textPressed]}>
						{props.text}
					</Text>
				</View>
			)}
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
	iconPressed: {
		opacity: 0.75,
	},
	text: {
		marginLeft: 11,
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
		color: Colors.accent4,
	},
	textPressed: {
		opacity: 0.75,
	},
});

export default EditProfileLink;
