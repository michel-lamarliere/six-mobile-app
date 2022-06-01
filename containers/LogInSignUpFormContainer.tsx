import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Pressable,
	Text,
	GestureResponderEvent,
} from 'react-native';
import RoundedButton from '../components/buttons/RoundedButton';

// import { useUserClass } from '../../styles/user-class-hook';

interface Props {
	navigation?: any;
	formHandler: (event: GestureResponderEvent) => void;
	headerTitle: string;
	footerText: string;
	footerTextLink: string;
	submitButtonText: string;
	switchFormHandler?: () => void;
	responseMessage: string;
}

const FormContainer: React.FC<Props> = (props) => {
	// const { User } = useUserClass();

	const backButton = () => {
		props.navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={backButton} style={styles.backButton}>
					<Image
						source={require('../assets/icons/back-button.png')}
						style={styles.backButtonImage}
					/>
				</Pressable>
				<Text style={styles.headerTitle}>{props.headerTitle}</Text>
			</View>
			{/* {!User.isLoggedIn() && ( */}
			<>
				{props.children}
				<RoundedButton
					text={props.submitButtonText}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					onPress={props.formHandler}
				/>
				<Text style={styles.responseMessage}>{props.responseMessage}</Text>
			</>
			{/* )} */}
			<View style={styles.footer}>
				{/* {!User.isLoggedIn() && ( */}
				<>
					<Text style={styles.footerText}>{props.footerText}</Text>

					<Pressable
						onPress={props.switchFormHandler}
						style={styles.footerButton}
					>
						<Text>{props.footerTextLink}</Text>
					</Pressable>
				</>
				{/* )} */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	header: {},
	backButton: {},
	backButtonImage: {},
	headerTitle: {},
	submitButton: {},
	submitButtonText: {},
	responseMessage: {},
	footer: {},
	footerText: {},
	footerButton: {},
});

export default FormContainer;
