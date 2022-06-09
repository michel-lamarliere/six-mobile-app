import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	GestureResponderEvent,
	Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

import { useUserClass } from '../../classes/user-class';

import RoundedButton from '../../components/buttons/RoundedButton';
import EditProfileLink from './EditProfileButton/EditProfileLink';

import Colors from '../../constants/colors';

const DailyView: React.FC = () => {
	const User = useUserClass();

	const userState = useSelector((state: RootState) => state.user);

	const [showMenu, setShowMenu] = useState(true);

	return (
		<View style={styles.wrapper}>
			<View style={styles.user}>
				<Image
					source={require('../../assets/icons/user/icon_0.png')}
					style={styles.icon}
				/>
				<Text style={styles.name}>{userState.name}</Text>
			</View>
			{!userState.confirmedEmail && (
				<Pressable onPress={() => {}}>
					<View style={styles.confirmedEmail}>
						<Text style={styles.confirmedEmailText}>
							Adresse mail non confirmée
						</Text>
						<Image
							source={require('../../assets/icons/profile/profile-confirmed-email-arrow.png')}
							style={styles.confirmedEmailIcon}
						/>
					</View>
				</Pressable>
			)}
			<RoundedButton
				text={'Voir mes statistiques'}
				buttonStyle={styles.statsButton}
				textStyle={styles.statsButtonText}
				onPress={() => {}}
			>
				<Image
					source={require('../../assets/icons/profile/profile-stats.png')}
					style={styles.statsButtonIcon}
				/>
			</RoundedButton>
			<Pressable
				onPress={() => {
					setShowMenu((prev) => !prev);
				}}
			>
				<View style={styles.editProfileButton}>
					<Text style={styles.editProfileButtonText}>Éditer le profil</Text>
					<Image
						source={require('../../assets/icons/profile/profile-arrow-down.png')}
						style={[
							styles.editProfileButtonImage,
							showMenu && styles.editProfileButtonImageOpenned,
						]}
					/>
				</View>
			</Pressable>
			{showMenu && (
				<View style={styles.editProfileList}>
					<EditProfileLink
						onPress={() => {}}
						iconPath={require('../../assets/icons/profile/profile-modify-icon.png')}
						text={'Icon'}
					/>
					<EditProfileLink
						onPress={() => {}}
						iconPath={require('../../assets/icons/profile/profile-modify-name.png')}
						text={'Nom'}
					/>
					<EditProfileLink
						onPress={() => {}}
						iconPath={require('../../assets/icons/profile/profile-modify-email.png')}
						text={'Adresse mail'}
					/>
					<EditProfileLink
						onPress={() => {}}
						iconPath={require('../../assets/icons/profile/profile-modify-password.png')}
						text={'Mot de passe'}
					/>
					<Pressable onPress={() => {}}>
						<Text style={styles.deleteAccount}>Supprimer mon compte</Text>
					</Pressable>
				</View>
			)}
			<Pressable
				onPress={() => {
					User.logOut();
				}}
			>
				<View style={styles.logOut}>
					<Image
						source={require('../../assets/icons/profile/profile-log-out.png')}
						style={styles.logOutIcon}
					/>
					<Text style={styles.logOutText}>Déconnexion</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: Colors.main3,
		alignItems: 'center',
	},
	user: {
		marginTop: 40,
		alignItems: 'center',
	},
	icon: {
		width: 60,
		height: 60,
	},
	name: {
		marginTop: 12,
		fontFamily: 'Poppins-Bold',
		fontSize: 28,
		color: Colors.accent,
	},
	confirmedEmail: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	confirmedEmailText: {
		fontFamily: 'Poppins-Medium-Italic',
		fontSize: 12,
		color: Colors.accent4,
	},
	confirmedEmailIcon: {
		width: 20,
		height: 20,
		marginLeft: 10,
	},
	statsButton: {
		marginTop: 45,
		backgroundColor: Colors.accent2,
	},
	statsButtonText: {
		color: Colors.main2,
	},
	statsButtonIcon: {
		marginLeft: 10,
		width: 18,
		height: 18,
	},
	editProfileButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 40,
	},
	editProfileButtonText: {
		fontFamily: 'Poppins-Semi-Bold',
		fontSize: 18,
		color: Colors.accent,
	},
	editProfileButtonImage: {
		marginLeft: 18,
	},
	editProfileButtonImageOpenned: {
		transform: [{ rotateX: '180deg' }],
	},
	editProfileList: {
		marginTop: 21,
	},
	deleteAccount: {
		marginTop: 10,
		fontFamily: 'Poppins-Semi-Bold-Italic',
		color: Colors.accent,
		fontSize: 13,
	},
	logOut: {
		flexDirection: 'row',
		marginTop: 60,
	},
	logOutIcon: {
		width: 23,
		height: 23,
	},
	logOutText: {
		marginLeft: 8,
		fontFamily: 'Poppins-Medium',
		fontSize: 20,
		color: Colors.main2,
	},
});

export default DailyView;
