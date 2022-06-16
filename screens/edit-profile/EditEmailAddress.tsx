import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { object, string } from 'yup';

import { RootState } from '../../store/store';

import { useHttpRequest } from '../../hooks/http-request';

import { Input, InputVariantTypes } from '../../components/form-elements/Input';
import EditProfileContainer from '../../containers/EditProfileContainer';
import RoundedButton, {
	RoundedButtonVariantTypes,
} from '../../components/buttons/RoundedButton';

import Colors from '../../constants/colors';
import { emailAddressSchema } from '../../constants/input-schemas';

interface Props {
	navigation: any;
}

const EditEmailAddress: React.FC<Props> = (props) => {
	const { sendRequest } = useHttpRequest();

	const userState = useSelector((state: RootState) => state.user);

	const [serverResponseMessage, setServerResponseMessage] = useState('');

	const formValidationSchema = object({
		emailAddress: emailAddressSchema.notOneOf(
			[userState.emailAddress],
			"La nouvelle adresse mail ne peut pas être identique à l'actuelle."
		),
	});

	const serverResponseHandler = (
		responseData: any,
		actions: FormikHelpers<{ emailAddress: string }>
	) => {
		if (!responseData) {
			return;
		}

		if (responseData.used) {
			console.log('hello');
			actions.setFieldError(
				'emailAddress',
				'Adresse mail déjà utilisée, veuillez en choisir une autre.'
			);
		}
	};

	const submitHandler = async (values: { emailAddress: string }) => {
		const { response, responseData } = await sendRequest({
			url: '/users/modify/email-address/send-emails',
			method: 'PATCH',
			body: JSON.stringify({
				newEmailAddress: values.emailAddress,
			}),
		});

		if (!responseData) {
			return;
		}

		if (response.status === 200) {
			setServerResponseMessage(
				'Emails envoyés, veuillez consulter vos boîtes mail.'
			);
		}

		if (response.status === 400 && responseData.waitFiveMinutes) {
			setServerResponseMessage(
				'Veuillez attendre 5 minutes entre chaque envoi de mail.'
			);
		}

		return responseData;
	};

	return (
		<EditProfileContainer
			title={'Adresse mail'}
			navigation={props.navigation}
			responseMessage={serverResponseMessage}
			setResponseMessage={setServerResponseMessage}
		>
			<Formik
				initialValues={{ emailAddress: '' }}
				validationSchema={formValidationSchema}
				onSubmit={(values, actions) => {
					submitHandler(values).then((responseData) => {
						serverResponseHandler(responseData, actions);
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
					<View style={styles.form}>
						<View style={styles.text}>
							<Text style={styles.emailLabel}>Adresse mail actuelle :</Text>
							<Text style={styles.email}>
								{userState.emailAddress.value}
							</Text>
						</View>
						<Input
							variant={InputVariantTypes.EDIT_PROFILE}
							style={styles.input}
							placeholder={'alicia@email.com'}
							value={values.emailAddress}
							onChangeText={handleChange('emailAddress')}
							onBlur={handleBlur('emailAddress')}
							touched={touched.emailAddress}
							errorText={errors.emailAddress}
						/>
						<RoundedButton
							onPress={handleSubmit}
							variant={RoundedButtonVariantTypes.EDIT_PROFILE}
						/>
					</View>
				)}
			</Formik>
		</EditProfileContainer>
	);
};

const styles = StyleSheet.create({
	form: {
		alignItems: 'center',
	},
	text: {
		marginTop: 40,
		alignSelf: 'flex-start',
	},
	emailLabel: {
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		color: Colors.accent4,
	},
	email: {
		marginTop: 8,
		fontFamily: 'Poppins-Semi-Bold',
		fontSize: 16,
		color: Colors.main2,
	},
	input: {
		marginTop: 24,
	},
});

export default EditEmailAddress;
