import { View, Text } from 'react-native';
import React from 'react';
import EditProfileContainer from '../../containers/EditProfileContainer';

interface Props {
	navigation: any;
}

const EditIcon: React.FC<Props> = (props) => {
	return (
		<EditProfileContainer
			navigation={props.navigation}
			title={'Modifier Icône'}
			showSubmitButton={true}
			submitButtonHandler={() => {}}
		></EditProfileContainer>
	);
};

export default EditIcon;
