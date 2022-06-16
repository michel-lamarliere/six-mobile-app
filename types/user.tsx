export interface User {
	token: null | string;
	icon: null | number;
	name: null | string;
	emailAddress: {
		value: null | string;
		confirmed: boolean | null;
	};
}
