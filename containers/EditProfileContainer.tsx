import React from 'react';
import {
	View,
	Text,
	Pressable,
	Image,
	StyleSheet,
	GestureResponderEvent,
} from 'react-native';
import RoundedButton from '../components/buttons/RoundedButton';

import Colors from '../constants/colors';

interface Props {
	navigation: any;
	title: string;
	showSubmitButton: boolean;
	submitButtonHandler: () => void;
}

const EditProfileContainer: React.FC<Props> = (props) => {
	return (
		<View style={styles.wrapper}>
			<Pressable
				style={styles.backButton}
				onPress={() => props.navigation.goBack()}
			>
				<Image
					source={require('../assets/icons/back-button.png')}
					style={styles.backButtonIcon}
				/>
			</Pressable>
			<Text style={styles.title}>{props.title}</Text>
			{props.children}
			{props.showSubmitButton && (
				<RoundedButton
					text={'Enregistrer'}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					onPress={props.submitButtonHandler}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: Colors.main3,
		alignItems: 'center',
	},
	backButton: {
		marginTop: 10,
		marginLeft: 36,
		alignSelf: 'flex-start',
	},
	backButtonIcon: {},
	title: {
		textAlign: 'center',
		marginTop: 50,
		fontFamily: 'Poppins-Bold',
		fontSize: 22,
		color: Colors.accent,
	},
	submitButton: {
		marginTop: 50,
		backgroundColor: Colors.accent2,
	},
	submitButtonText: {
		color: Colors.main2,
	},
});

export default EditProfileContainer;
