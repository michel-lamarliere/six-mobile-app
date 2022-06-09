import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

import UserType from '../types/user-type';

export const enum UserActionTypes {
	LOG_USER_IN = 'LOG_USER_IN',
	LOG_USER_OUT = 'LOG_USER_OUT',
	REFRESH_USER_DATA = 'REFRESH_USER_DATA',
}

const initialState: UserType = {
	token: null,
	// tokenExpiration: null,
	// id: null,
	icon: null,
	name: null,
	email: null,
	confirmedEmail: null,
};

export const counterSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		LOG_USER_IN: (state: UserType, action: PayloadAction<UserType>) => {
			state = {
				token: action.payload.token,
				// tokenExpiration = action.payload.tokenExpiration
				icon: action.payload.icon,
				name: action.payload.name,
				email: action.payload.email,
				confirmedEmail: action.payload.confirmedEmail,
			};
		},

		LOG_USER_OUT: (state: UserType) => {
			state = {
				token: null,
				// tokenExpiration: null,
				icon: null,
				name: null,
				email: null,
				confirmedEmail: null,
			};
		},

		REFRESH_USER_DATA: (state: UserType, action: PayloadAction<UserType>) => {
			state = {
				token: state.token,
				// tokenExpiration: null,
				icon: action.payload.icon,
				name: action.payload.name,
				email: action.payload.email,
				confirmedEmail: action.payload.confirmedEmail,
			};
		},
	},
});

export const { LOG_USER_IN, LOG_USER_OUT, REFRESH_USER_DATA } = counterSlice.actions;

export default counterSlice.reducer;