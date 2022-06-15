import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyView: React.FC = () => {
	return (
		<View style={styles.wrapper}>
			<Text>Daily</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
	},
});

export default DailyView;
