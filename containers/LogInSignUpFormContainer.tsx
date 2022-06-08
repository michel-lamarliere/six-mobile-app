import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Pressable,
	Text,
	GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RoundedButton from '../components/buttons/RoundedButton';
import Colors from '../constants/colors';

// import { useUserClass } from '../../styles/user-class-hook';

interface Props {
	headerTitle: string;
	footerText: string;
	footerTextLink: string;
	switchFormHandler: any;
	responseMessage: string;
}

const FormContainer: React.FC<Props> = (props) => {
	const navigation = useNavigation();
	// const { User } = useUserClass();

	const backButtonHandler = () => {
		navigation.goBack();
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<Pressable onPress={backButtonHandler} style={styles.backButton}>
						<Image
							source={require('../assets/icons/back-button.png')}
							style={styles.backButtonImage}
						/>
					</Pressable>
					<Text style={styles.headerTitle}>{props.headerTitle}</Text>
				</View>
				<View style={styles.inputs}>{props.children}</View>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>{props.footerText} </Text>
				<Pressable
					// onPress={() => navigation.navigate(props.switchFormHandler)}
					onPress={props.switchFormHandler}
					style={styles.footerButton}
				>
					<Text style={styles.footerButtonText}>{props.footerTextLink}</Text>
				</Pressable>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.purple1,
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 38,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backButton: {
		position: 'absolute',
		left: 0,
		alignItems: 'center',
		justifyContent: 'center',
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		backgroundColor: Colors.purple2,
	},
	backButtonImage: {
		width: 5,
		height: 10,
	},
	headerTitle: {
		fontFamily: 'Poppins-Extra-Bold',
		fontSize: 24,
		color: Colors.lavender,
	},
	inputs: {
		marginTop: 40,
	},
	responseMessage: {},
	footer: {
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 90,
		backgroundColor: Colors.purple3,
	},
	footerText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
		color: Colors.white,
	},
	footerButton: {},
	footerButtonText: {
		fontFamily: 'Poppins-Bold',
		fontSize: 16,
		color: Colors.white,
		textDecorationLine: 'underline',
	},
});

export default FormContainer;
