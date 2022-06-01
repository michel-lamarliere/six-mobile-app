import React, { FormEvent } from 'react';
import { Text } from 'react-native';
import FormContainer from '../../containers/LogInSignUpFormContainer';

const LogIn: React.FC = () => {
	return (
		<FormContainer
			formHandler={() => {
				console.log('Hello');
			}}
			headerTitle={'Vous revoilà !'}
			submitButtonText={'Connexion'}
			footerText={'Pas de compte ?'}
			footerTextLink={'Inscrivez-vous !'}
			switchFormHandler={() => {}}
			responseMessage={''}
		>
			<Text>Hello</Text>
		</FormContainer>
	);
};

export default LogIn;
