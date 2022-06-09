import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useUserClass } from '../../classes/user-class';

import RoundedButton from '../../components/buttons/RoundedButton';

const DailyView: React.FC = () => {
	const User = useUserClass();

	return (
		<View>
			<RoundedButton
				text={'Log out'}
				onPress={() => {
					User.logOut();
				}}
				buttonStyle={styles.buttonStyle}
				textStyle={styles.textStyle}
			/>
			<Text>Profile</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: 'black',
	},
	textStyle: {
		color: 'white',
	},
});

export default DailyView;
