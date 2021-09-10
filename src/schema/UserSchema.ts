export const UserCreateSchema = {
	first_name: String,
	last_name: String,
	username: String,
	company_name: String,
	email: String,
	password: String,
};

export interface UserCreateSchema {
	first_name: string;
	last_name: string;
	email: string;
	company_name: string;
	password: string;
	username: string;
}

export const UserUpdateSchema = {
	first_name: String,
	last_name: String,
	username: String,
	company_name: String,
	email: String,
};

export interface UserUpdateSchema {
	first_name: string;
	last_name: string;
	email: string;
	company_name: string;
	username: string;
}

export interface UserLoginSchema {
	email: string;
	password: string;
}

export const UserLoginSchema = {
	email: String,
	password: String,
};