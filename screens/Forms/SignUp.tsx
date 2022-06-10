import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Formik, FormikHelpers } from 'formik';
import { object, string, ref } from 'yup';

import { useUserClass } from '../../classes/user-class';

import { Input } from '../../components/form-elements/Input';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';

import { BACKEND_API_URL } from '@env';

interface Props {
	navigation: any;
}

interface SignUpResponseData {
	validInputs: {
		all: boolean;
		name: boolean;
		email: {
			format: boolean;
			isAvailable: boolean;
		};
		password: boolean;
		passwordConfirmation: boolean;
	};
}

interface SignUpInputs {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

const LogIn: React.FC<Props> = (props) => {
	const User = useUserClass();
	const [serverResponseMessage, setServerResponseMessage] = useState('');

	let signUpSchema = object({
		name: string()
			.required('Champ obligatoire.')
			.min(2, '1 caractères minimum.')
			.max(20, 'Nom trop long (20 caractères maximum).'),
		email: string().required('Champ obligatoire.').email('Format invalide.'),
		password: string()
			.required('Champ obligatoire.')
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{0,}$/,
				'Votre mot de passe doit comprendre au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spécial.'
			)
			.min(8, 'Mot de passe trop court (8 caractères minimum).')
			.max(50, 'Mot de passe trop long (50 caractères minimum).'),
		passwordConfirmation: string()
			.required('Champ obligatoire.')
			.oneOf([ref('password'), null], 'Les mots de passe doivent correspondre.'),
	});

	const serverInputErrorsHandler = (
		responseData: SignUpResponseData,
		actions: FormikHelpers<SignUpInputs>
	) => {
		if (!responseData) {
			return;
		}

		if (!responseData.validInputs.name) {
			actions.setFieldError('name', 'Format incorrect.');
		}

		if (!responseData.validInputs.email.format) {
			actions.setFieldError('email', 'Format incorrect.r');
		}

		if (!responseData.validInputs.email.isAvailable) {
			actions.setFieldError(
				'email',
				'Email déjà utilisé. Veuillez en choisir une autre ou vous connecter.'
			);
		}

		if (!responseData.validInputs.password) {
			actions.setFieldError('email', 'Format incorrect.');
		}

		if (!responseData.validInputs.password) {
			actions.setFieldError(
				'password',
				'Les mots de passe doivent être identiques.'
			);
		}
	};

	const submitHandler = async (values: {
		name: string;
		email: string;
		password: string;
		passwordConfirmation: string;
	}) => {
		const response = await fetch(`${BACKEND_API_URL}/users/sign-up`, {
			method: 'POST',
			headers: { 'Content-Type': 'Application/json' },
			body: JSON.stringify({
				name: values.name.trim().toLowerCase(),
				email: values.email.trim().toLowerCase(),
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
			}),
		});

		const responseData = await response.json();

		if (response.status === 201) {
			User.logIn(responseData);
		}

		if (response.status === 400) {
			return responseData;
		}

		if (response.status === 404) {
			setServerResponseMessage(
				"Erreur lors de l'inscription, veuillez réessayer plus tard."
			);
		}
	};

	return (
		<FormContainer
			headerTitle={'Bienvenue !'}
			footerText={'Déja membre ?'}
			footerTextLink={'Connectez-vous !'}
			switchFormHandler={() => props.navigation.replace('LogIn')}
			responseMessage={serverResponseMessage}
		>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					passwordConfirmation: '',
				}}
				validationSchema={signUpSchema}
				onSubmit={(values, actions) => {
					submitHandler(values).then((responseData) => {
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
							placeholder={'Prénom'}
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							touched={touched.name}
							errorText={errors.name}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Adresse mail'}
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							touched={touched.email}
							errorText={errors.email}
							keyboardType={'email-address'}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Mot de passe'}
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							touched={touched.password}
							errorText={errors.password}
							secureTextEntry={true}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Confirmation mot de passe'}
							value={values.passwordConfirmation}
							onChangeText={handleChange('passwordConfirmation')}
							onBlur={handleBlur('passwordConfirmation')}
							touched={touched.passwordConfirmation}
							errorText={errors.passwordConfirmation}
							secureTextEntry={true}
						/>
						<RoundedButton
							text={'Inscription'}
							buttonStyle={styles.submitButton}
							textStyle={styles.submitButtonText}
							onPress={() => {
								handleSubmit();
							}}
						/>
					</>
				)}
			</Formik>
		</FormContainer>
	);
};

const styles = StyleSheet.create({
	notFirstInput: {
		marginTop: 14,
	},
	submitButton: {
		marginTop: 8,
		alignSelf: 'center',
	},
	submitButtonText: {
		color: Colors.main,
	},
});

export default LogIn;
