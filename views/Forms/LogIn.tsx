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
import { useNavigation } from '@react-navigation/native';

import { Formik } from 'formik';
import { object, string } from 'yup';

import { Input } from '../../components/form-elements/Inputs';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';

interface Props {
	navigation: any;
}

const LogIn: React.FC<Props> = (props) => {
	const [rememberEmail, setRememberEmail] = useState(false);

	let loginSchema = object({
		email: string().email('Format invalide.').required('Champ obligatoire.'),
		password: string()
			.min(8, 'Mot de passe trop court.')
			.max(50, 'Mot de passe trop long.')
			.required('Champ obligatoire.'),
	});

	return (
		<FormContainer
			formHandler={() => {
				console.log('Hello');
			}}
			headerTitle={'Vous revoilà !'}
			footerText={'Pas de compte ?'}
			footerTextLink={'Inscrivez-vous !'}
			switchFormHandler={() => props.navigation.replace('SignUp')}
			responseMessage={''}
		>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={loginSchema}
				onSubmit={(values) => console.log(values)}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					// <Form>
					<>
						<View style={styles.inputs}>
							<Input
								placeholder={'Adresse mail'}
								value={values.email}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								isValid={!errors.email}
								errorMessage={errors.email}
							/>
							<Input
								style={styles.passwordInput}
								placeholder={'Mot de passe'}
								value={values.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								isValid={!errors.email}
								errorMessage={errors.password}
							/>
							<View style={styles.checkboxContainer}>
								<Pressable
									onPress={() => setRememberEmail((prev) => !prev)}
								>
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
								<Text style={styles.checkboxText}>
									Se souvenir de moi
								</Text>
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
						</View>
					</>
				)}
			</Formik>

			<Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
		</FormContainer>
	);
};

const styles = StyleSheet.create({
	inputs: {
		marginTop: 77,
	},
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
