import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Formik, FormikHelpers } from 'formik';
import { object } from 'yup';

import { useUserClass } from '../../classes/user';
import { useHttpRequest } from '../../hooks/http-request';

import { Input } from '../../components/form-elements/Input';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';

import {
	emailAddressSchema,
	nameSchema,
	passwordConfirmationSchema,
	passwordSchema,
} from '../../constants/input-schemas';

import { User } from '../../types/user';

interface Props {
	navigation: any;
}

interface SignUpResponseData {
	validInputs: {
		all: boolean;
		name: boolean;
		emailAddress: {
			format: boolean;
			isAvailable: boolean;
		};
		password: boolean;
		passwordConfirmation: boolean;
	};
}

interface SignUpInputs {
	name: string;
	emailAddress: string;
	password: string;
	passwordConfirmation: string;
}

const LogIn: React.FC<Props> = (props) => {
	const User = useUserClass();
	const { sendRequest } = useHttpRequest();

	const [serverResponseMessage, setServerResponseMessage] = useState('');

	let signUpSchema = object({
		name: nameSchema,
		emailAddress: emailAddressSchema,
		password: passwordSchema,
		passwordConfirmation: passwordConfirmationSchema,
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

		if (!responseData.validInputs.emailAddress.format) {
			actions.setFieldError('emailAddress', 'Format incorrect.');
		}

		if (!responseData.validInputs.emailAddress.isAvailable) {
			actions.setFieldError(
				'emailAddress',
				'Email déjà utilisé. Veuillez en choisir une autre ou vous connecter.'
			);
		}

		if (!responseData.validInputs.password) {
			actions.setFieldError('emailAddress', 'Format incorrect.');
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
		emailAddress: string;
		password: string;
		passwordConfirmation: string;
	}) => {
		let { response, responseData } = await sendRequest({
			url: '/users/sign-up',
			method: 'POST',
			body: JSON.stringify({
				name: values.name.trim().toLowerCase(),
				emailAddress: values.emailAddress.trim().toLowerCase(),
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
			}),
		});

		console.log(responseData);

		if (response.status === 201) {
			const responseUserData: User = responseData;
			User.logIn(responseUserData);
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
			setResponseMessage={setServerResponseMessage}
		>
			<Formik
				initialValues={{
					name: '',
					emailAddress: '',
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
							value={values.emailAddress}
							onChangeText={handleChange('emailAddress')}
							onBlur={handleBlur('emailAddress')}
							touched={touched.emailAddress}
							errorText={errors.emailAddress}
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
