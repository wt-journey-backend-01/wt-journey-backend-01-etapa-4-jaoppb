import express from 'express';
import authController from '../controllers/authController';
import { ZodOpenApiOperationObject, ZodOpenApiPathsObject } from 'zod-openapi';

const router = express.Router();

const registerApi: ZodOpenApiOperationObject = {
	summary: 'User registration route',
	responses: {
		201: {
			description: 'User successfully registered',
		},
	},
};
router.post('/auth/register', authController.register);

const loginApi: ZodOpenApiOperationObject = {
	summary: 'User login route',
	responses: {
		200: {
			description: 'Successful login',
		},
	},
};
router.post('/auth/login', authController.login);

const deleteUserApi: ZodOpenApiOperationObject = {
	summary: 'Delete user route',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string' },
		},
	],
	responses: {
		204: {
			description: 'User successfully deleted',
		},
	},
};
router.delete('/users/:id', authController.deleteUser);

const logoutApi: ZodOpenApiOperationObject = {
	summary: 'User logout route',
	responses: {
		204: {
			description: 'User successfully logged out',
		},
	},
};
router.post('/auth/logout', authController.logout);

export const authApi: ZodOpenApiPathsObject = {
	'/auth/register': {
		post: registerApi,
	},
	'/auth/login': {
		post: loginApi,
	},
	'/auth/logout': {
		post: logoutApi,
	},
	'/users/{id}': {
		delete: deleteUserApi,
	},
};

export default router;
