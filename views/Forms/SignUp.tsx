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

import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { Input } from '../../components/form-elements/Inputs';
import FormContainer from '../../containers/LogInSignUpFormContainer';

import Colors from '../../constants/colors';
import RoundedButton from '../../components/buttons/RoundedButton';
import { useNavigation } from '@react-navigation/native';

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
			headerTitle={'Bienvenue !'}
			footerText={'Déja membre ?'}
			footerTextLink={'Connectez-vous !'}
			switchFormHandler={() => props.navigation.replace('LogIn')}
			responseMessage={''}
		>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					passwordConfirmation: '',
				}}
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
								style={styles.notFirstInput}
								placeholder={'Prénom'}
								value={values.name}
								onChangeText={handleChange('name')}
								onBlur={handleBlur('name')}
								isValid={!errors.name}
								errorMessage={errors.name}
							/>
							<Input
								placeholder={'Adresse mail'}
								value={values.email}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								isValid={!errors.email}
								errorMessage={errors.email}
							/>

							<Input
								style={styles.notFirstInput}
								placeholder={'Mot de passe'}
								value={values.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								isValid={!errors.email}
								errorMessage={errors.password}
							/>
							<Input
								style={styles.notFirstInput}
								placeholder={'Confirmation mot de passe'}
								value={values.passwordConfirmation}
								onChangeText={handleChange('passwordConfirmation')}
								onBlur={handleBlur('passwordConfirmation')}
								isValid={!errors.passwordConfirmation}
								errorMessage={errors.passwordConfirmation}
							/>

							<RoundedButton
								text={'Inscription'}
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
		</FormContainer>
	);
};

const styles = StyleSheet.create({
	inputs: {
		marginTop: 77,
	},
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
