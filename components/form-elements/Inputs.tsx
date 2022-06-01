import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';

interface Props {
	placeholder: string;
	value: string;
	isValid: boolean;
	onChangeText: (event: any) => void;
	onBlur: (event: any) => void;
	errorMessage?: string;
	style?: ViewStyle;
}

export const Input: React.FC<Props> = (props) => {
	// const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={[styles.container, props.style]}>
			<TextInput
				style={[styles.input, !props.isValid && styles.invalid]}
				placeholder={props.placeholder}
				placeholderTextColor={Colors.lavender}
				value={props.value}
				onChangeText={props.onChangeText}
				onBlur={props.onBlur}
			/>
			<Text style={styles.errorMessage}>{props.errorMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	input: {
		height: 50,
		width: '100%',
		paddingHorizontal: 14,
		paddingVertical: 16,
		backgroundColor: Colors.purple2,
		color: Colors.white,
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		borderWidth: 2,
		borderColor: 'transparent',
		borderRadius: 10,
	},
	invalid: {
		borderColor: Colors.blue1,
	},
	errorMessage: {
		marginLeft: 1,
		fontFamily: 'Poppins-Medium',
		fontSize: 12,
		color: Colors.blue1,
	},
});
