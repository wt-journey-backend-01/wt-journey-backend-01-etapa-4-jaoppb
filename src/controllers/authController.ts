import { Request, Response } from 'express';
import authRepository from '../repositories/authRepository';

function register(req: Request, res: Response) {
	const { nome, email, senha } = req.body as any;

	const token = authRepository.register({ nome, email, senha } as any);
	res.status(201).send();
}

function login(req: Request, res: Response) {
	const { email, senha } = req.body as any;

	const token = authRepository.login({ email, senha } as any);
	res.status(200).send();
}

function logout(req: Request, res: Response) {
	const { token } = req.body as any;

	authRepository.logout(token);
	res.status(204).send();
}

function deleteUser(req: Request, res: Response) {
	const { id } = req.params;

	authRepository.deleteUser(id);
	res.status(204).send();
}

export default {
	register,
	login,
	logout,
	deleteUser,
};
