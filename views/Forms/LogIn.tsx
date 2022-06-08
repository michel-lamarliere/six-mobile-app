import React, { FormEvent, useState } from 'react';
import {
	Text,
	Image,
	View,
	StyleSheet,
	Pressable,
	TextInput,
	Button,
	GestureResponderEvent,
} from 'react-native';

import { Formik } from 'formik';

import { Input } from '../../components/form-elements/Inputs';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';

interface Props {
	navigation: any;
}

const LogIn: React.FC<Props> = (props) => {
	const [rememberEmail, setRememberEmail] = useState(false);
	// const [formValues, setFormValues] = useState({});

	const submitHandler = async (values: { email: string; password: string }) => {
		const response = await fetch(
			'https://six-app-server.herokuapp.com/api/user/sign-in',
			{
				method: 'POST',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			}
		);

		const responseData = await response.json();

		console.log(responseData);
	};

	return (
		<FormContainer
			headerTitle={'Vous revoilà !'}
			footerText={'Pas de compte ?'}
			footerTextLink={'Inscrivez-vous !'}
			switchFormHandler={() => props.navigation.replace('SignUp')}
			responseMessage={''}
		>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={(values) => {
					console.log(values), submitHandler(values);
				}}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					<>
						<Input
							placeholder={'Adresse mail'}
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							touched={touched.email}
							error={errors.email}
						/>
						<Input
							style={styles.passwordInput}
							placeholder={'Mot de passe'}
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							touched={touched.password}
							error={errors.password}
						/>
						<View style={styles.checkboxContainer}>
							<Pressable onPress={() => setRememberEmail((prev) => !prev)}>
								<Image
									source={
										rememberEmail
											? require('../../assets/icons/forms-inputs/remember-me_true.png')
											: require('../../assets/icons/forms-inputs/remember-me_false.png')
									}
									width={25}
									height={25}
								/>
							</Pressable>
							<Text style={styles.checkboxText}>Se souvenir de moi</Text>
						</View>
						<RoundedButton
							text={'Connexion'}
							buttonStyle={styles.submitButton}
							textStyle={styles.submitButtonText}
							onPress={
								handleSubmit as () => void as (
									event: GestureResponderEvent
								) => void
							}
						/>
					</>
				)}
			</Formik>
			<Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
		</FormContainer>
	);
};

const styles = StyleSheet.create({
	passwordInput: {
		marginTop: 14,
	},
	checkboxContainer: {
		marginTop: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},
	checkboxText: {
		marginLeft: 8,
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: Colors.lavender,
	},
	submitButton: {
		marginTop: 8,
		alignSelf: 'center',
	},
	submitButtonText: {
		color: Colors.purple2,
	},
	forgotPassword: {
		marginTop: 110,
		textAlign: 'center',
		fontFamily: 'Poppins-Medium-Italic',
		fontSize: 14,
		color: Colors.lavender,
		textDecorationLine: 'underline',
	},
});

export default LogIn;
