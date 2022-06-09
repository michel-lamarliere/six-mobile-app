import React, { useState } from 'react';
import {
	Text,
	Image,
	View,
	StyleSheet,
	Pressable,
	GestureResponderEvent,
} from 'react-native';

import { Formik } from 'formik';
import { object, ref, string } from 'yup';

import { useUserClass } from '../../classes/user-class';

import UserType from '../../types/user-type';

import { Input } from '../../components/form-elements/Inputs';
import FormContainer from '../../containers/LogInSignUpFormContainer';
import RoundedButton from '../../components/buttons/RoundedButton';

import Colors from '../../constants/colors';

import { BACKEND_API_URL } from '@env';

interface Props {
	navigation: any;
}

const LogIn: React.FC<Props> = (props) => {
	const User = useUserClass();

	const [rememberEmail, setRememberEmail] = useState(false);
	const [serverResponseMessage, setServerResponseMessage] = useState('');

	let logInSchema = object({
		email: string().required('Champ obligatoire.'),
		password: string().required('Champ obligatoire.'),
	});

	const serverInputErrorsHandler = (responseData: any, actions: any) => {
		if (!responseData) {
			return;
		}

		if (!responseData.validInputs.email) {
			actions.setFieldError('email', 'Email introuvable.');
		} else if (!responseData.validInputs.password) {
			actions.setFieldError('password', 'Mot de passe incorrect.');
		}
	};

	const submitHandler = async (values: { email: string; password: string }) => {
		const response = await fetch(`${BACKEND_API_URL}/users/sign-in`, {
			method: 'POST',
			headers: { 'Content-Type': 'Application/json' },
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
		});

		const responseData:
			| UserType
			// | error: boolean,
			| any = await response.json();

		if (response.status === 200) {
			User.logIn(responseData);
		}

		if (response.status === 400) {
			return responseData;
		}
	};

	return (
		<FormContainer
			headerTitle={'Vous revoilà !'}
			footerText={'Pas de compte ?'}
			footerTextLink={'Inscrivez-vous !'}
			switchFormHandler={() => props.navigation.replace('SignUp')}
			responseMessage={serverResponseMessage}
		>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={logInSchema}
				onSubmit={(values, actions) => {
					submitHandler(values).then((responseData: any) => {
						serverInputErrorsHandler(responseData, actions);
					});
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
						<Pressable onPress={() => setRememberEmail((prev) => !prev)}>
							<View style={styles.checkboxContainer}>
								<Image
									source={
										rememberEmail
											? require('../../assets/icons/forms-inputs/remember-me_true.png')
											: require('../../assets/icons/forms-inputs/remember-me_false.png')
									}
									width={25}
									height={25}
								/>
								<Text style={styles.checkboxText}>
									Se souvenir de moi
								</Text>
							</View>
						</Pressable>
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
		color: Colors.accent,
	},
	submitButton: {
		marginTop: 8,
		alignSelf: 'center',
	},
	submitButtonText: {
		color: Colors.main,
	},
	forgotPassword: {
		marginTop: 110,
		textAlign: 'center',
		fontFamily: 'Poppins-Medium-Italic',
		fontSize: 14,
		color: Colors.accent,
		textDecorationLine: 'underline',
	},
});

export default LogIn;
