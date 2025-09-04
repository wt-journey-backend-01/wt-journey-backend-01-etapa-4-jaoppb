import knex from '../db/db';
import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

async function register(userData: {
	username: string;
	password: string;
	email: string;
}) {
	const user = await knex('usuarios')
		.where({ email: userData.email })
		.first();
	if (user) throw new Error('User already exists');

	const encrypetedPasssword = hashSync(userData.password, 10);
	userData.password = encrypetedPasssword;

	return knex('usuarios').insert(userData);
}

async function login(credentials: { username: string; password: string }) {
	const { username, password } = credentials;

	const user = await knex('usuarios').where({ username }).first();
	if (!user) throw new Error('Invalid credentials');

	const isValidPassword = compareSync(password, user.password);
	if (!isValidPassword) throw new Error('Invalid credentials');

	const token = sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET!,
		{ expiresIn: '1h' },
	);

	return { token };
}

function logout(token: string) {
	// Logic to invalidate the user's token
	return 'User logged out successfully';
}

function deleteUser(userId: string) {
	return knex('usuarios').where({ id: userId }).del();
}

export default {
	register,
	login,
	logout,
	deleteUser,
};
