import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

import { useUserClass } from '../../classes/user';

import formatUserName from '../../utils/format-user-name';

import RoundedButton from '../../components/buttons/RoundedButton';
import EditProfileLink from './EditProfileLink';

import Colors from '../../constants/colors';
import UserIcon from '../../components/ui-elements/UserIcon';

interface Props {
	navigation: any;
}

const DailyView: React.FC<Props> = (props) => {
	const User = useUserClass();

	const userState = useSelector((state: RootState) => state.user);

	const [showMenu, setShowMenu] = useState(true);

	console.log(userState);

	return (
		<ScrollView
			style={styles.wrapper}
			bounces={false}
			contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
		>
			<View style={styles.user}>
				<UserIcon />
				<Text style={styles.name}>{formatUserName(userState.name)}</Text>
			</View>
			{!userState.emailAddress.confirmed && (
				<Pressable onPress={() => {}} style={styles.confirmedEmail}>
					{({ pressed }) => (
						<>
							<Text
								style={[
									styles.confirmedEmailText,
									pressed && styles.confirmedEmailTextPressed,
								]}
							>
								Adresse mail non confirmée
							</Text>
							<Image
								source={require('../../assets/icons/profile/profile-confirmed-email-arrow.png')}
								style={[
									styles.confirmedEmailIcon,
									pressed && styles.confirmedEmailIconPressed,
								]}
							/>
						</>
					)}
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
				style={styles.editProfileButton}
			>
				{({ pressed }) => (
					<>
						<Text
							style={[
								styles.editProfileButtonText,
								pressed && styles.editProfileButtonTextPressed,
							]}
						>
							Éditer le profil
						</Text>
						<Image
							source={require('../../assets/icons/profile/profile-arrow-down.png')}
							style={[
								styles.editProfileButtonImage,
								pressed && styles.editProfileButtonImagePressed,
								showMenu && styles.editProfileButtonImageOpened,
							]}
						/>
					</>
				)}
			</Pressable>
			{showMenu && (
				<View style={styles.editProfileList}>
					<EditProfileLink
						onPress={() => {
							props.navigation.navigate('EditIcon');
						}}
						iconPath={require('../../assets/icons/profile/profile-modify-icon.png')}
						text={'Icon'}
					/>
					<EditProfileLink
						onPress={() => {
							props.navigation.navigate('EditName');
						}}
						iconPath={require('../../assets/icons/profile/profile-modify-name.png')}
						text={'Nom'}
					/>
					<EditProfileLink
						onPress={() => {
							props.navigation.navigate('EditEmailAddress');
						}}
						iconPath={require('../../assets/icons/profile/profile-modify-email.png')}
						text={'Adresse mail'}
					/>
					<EditProfileLink
						onPress={() => {
							props.navigation.navigate('EditPassword');
						}}
						iconPath={require('../../assets/icons/profile/profile-modify-password.png')}
						text={'Mot de passe'}
					/>
					<Pressable style={styles.deleteAccount} onPress={() => {}}>
						{({ pressed }) => (
							<Text
								style={[
									styles.deleteAccountText,
									pressed && styles.deleteAccountTextPressed,
								]}
							>
								Supprimer mon compte
							</Text>
						)}
					</Pressable>
				</View>
			)}
			<Pressable
				onPress={() => {
					User.logOut();
				}}
				style={styles.logOut}
			>
				<Image
					source={require('../../assets/icons/profile/profile-log-out.png')}
					style={styles.logOutIcon}
				/>
				<Text style={styles.logOutText}>Déconnexion</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.main3,
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
	confirmedEmailTextPressed: {
		opacity: 0.75,
	},
	confirmedEmailIcon: {
		width: 20,
		height: 20,
		marginLeft: 10,
	},
	confirmedEmailIconPressed: {
		opacity: 0.75,
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
	editProfileButtonTextPressed: {
		opacity: 0.75,
	},
	editProfileButtonImage: {
		marginLeft: 18,
	},
	editProfileButtonImagePressed: {
		opacity: 0.75,
	},
	editProfileButtonImageOpened: {
		transform: [{ rotateX: '180deg' }],
	},
	editProfileList: {
		marginTop: 21,
	},
	deleteAccount: {
		marginTop: 10,
	},
	deleteAccountText: {
		fontFamily: 'Poppins-Semi-Bold-Italic',
		color: Colors.accent,
		fontSize: 13,
	},
	deleteAccountTextPressed: {
		opacity: 0.75,
	},
	logOut: {
		marginTop: 60,
		marginBottom: 20,
		flexDirection: 'row',
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
