import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Formik } from 'formik';
import { object, string, ref } from 'yup';

import { Input } from '../../components/form-elements/Inputs';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';

interface Props {
	navigation: any;
}

const LogIn: React.FC<Props> = (props) => {
	const [serverResponseMessage, setServerResponseMessage] = useState('');

	let loginSchema = object({
		name: string()
			.required('Champ obligatoire.')
			.min(1, '1 caractères minimum.')
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

	const submitHandler = async (values: {
		name: string;
		email: string;
		password: string;
		passwordConfirmation: string;
	}) => {
		console.log('Hello');

		const response = await fetch(
			'https://six-app-server.herokuapp.com/api/user/sign-up',
			{
				method: 'POST',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password,
					passwordConfirmation: values.passwordConfirmation,
				}),
			}
		);

		const responseData = await response.json();

		console.log(responseData);
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
				validationSchema={loginSchema}
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
							placeholder={'Prénom'}
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							touched={touched.name}
							error={errors.name}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Adresse mail'}
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							touched={touched.email}
							error={errors.email}
							keyboardType={'email-address'}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Mot de passe'}
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							touched={touched.password}
							error={errors.password}
							secureTextEntry={true}
						/>
						<Input
							style={styles.notFirstInput}
							placeholder={'Confirmation mot de passe'}
							value={values.passwordConfirmation}
							onChangeText={handleChange('passwordConfirmation')}
							onBlur={handleBlur('passwordConfirmation')}
							touched={touched.passwordConfirmation}
							error={errors.passwordConfirmation}
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
		color: Colors.purple2,
	},
});

export default LogIn;
