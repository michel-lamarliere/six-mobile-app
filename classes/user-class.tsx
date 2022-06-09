import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFormatUserName } from '../hooks/format-user-name';

import { AppDispatch, RootState } from '../store/store';
import { LOG_USER_IN, LOG_USER_OUT } from '../store/user';

import UserType from '../types/user-type';

export const useUserClass = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigation = useNavigation<any>();
	const { formatUserName } = useFormatUserName();

	const userState = useSelector((state: RootState) => state.user);

	class User {
		static async logIn(data: UserType) {
			dispatch(
				LOG_USER_IN({
					token: data.token,
					icon: data.icon,
					name: formatUserName(data.name),
					email: data.email,
					confirmedEmail: data.confirmedEmail,
				})
			);

			const userJson = JSON.stringify(data);
			await AsyncStorage.setItem('user', userJson);

			navigation.navigate('Authenticated');
		}

		static async autoLogIn() {
			const userRaw = await AsyncStorage.getItem('user');

			if (!userRaw) {
				return;
			}

			const user = JSON.parse(userRaw);

			dispatch(
				LOG_USER_IN({
					token: user.token,
					icon: user.icon,
					name: formatUserName(user.name),
					email: user.email,
					confirmedEmail: user.confirmedEmail,
				})
			);

			navigation.navigate('Authenticated');
		}

		static async logOut() {
			dispatch(LOG_USER_OUT());

			await AsyncStorage.removeItem('user');

			navigation.navigate('Homepage');
		}

		static isUserLoggedIn(userState: UserType) {
			if (
				!userState.token ||
				typeof userState.icon !== 'number' ||
				!userState.name ||
				!userState.email ||
				typeof userState.confirmedEmail === 'boolean'
			) {
				return false;
			}
			return true;
		}
	}

	return User;
};
