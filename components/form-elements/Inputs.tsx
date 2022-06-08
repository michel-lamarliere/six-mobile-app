import React, { useState } from 'react';
import {
	TextInput,
	StyleSheet,
	Text,
	View,
	ViewStyle,
	KeyboardTypeOptions,
	Pressable,
} from 'react-native';

import Colors from '../../constants/colors';

interface Props {
	placeholder: string;
	value: string;
	touched: boolean | any;
	error: boolean | any;
	onChangeText: (event: any) => void;
	onBlur: (event: any) => void;
	style?: ViewStyle;
	keyboardType?: KeyboardTypeOptions;
	secureTextEntry?: boolean;
}

export const Input: React.FC<Props> = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	const isInvalid = props.touched && props.error;

	return (
		<View style={[styles.container, props.style]}>
			<TextInput
				style={[styles.input, isInvalid && styles.invalid]}
				placeholder={props.placeholder}
				placeholderTextColor={Colors.lavender}
				value={props.value}
				onChangeText={props.onChangeText}
				onBlur={props.onBlur}
				autoCapitalize={'none'}
				keyboardType={props.keyboardType}
				secureTextEntry={showPassword && props.secureTextEntry}
			/>
			{props.secureTextEntry && (
				<Pressable onPress={() => setShowPassword((prev) => !prev)}>
					<Text>{showPassword ? 'Show Password' : 'Hide Password'}</Text>
				</Pressable>
			)}
			{isInvalid && (
				<Text style={styles.errorMessage}>{isInvalid && props.error}</Text>
			)}
		</View>
	);
};

Input.defaultProps = {
	keyboardType: 'default',
	secureTextEntry: false,
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
		marginTop: 2,
		fontFamily: 'Poppins-Medium',
		fontSize: 12,
		color: Colors.blue1,
	},
});
