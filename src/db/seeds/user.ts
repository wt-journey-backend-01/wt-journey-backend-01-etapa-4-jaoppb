import { Knex } from 'knex';

async function seed(knex: Knex) {
	await knex('usuarios').del();
	await knex('usuarios').insert([
		{
			nome: 'Admin User 1',
			email: 'admin1@example.com',
			senha: '$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC',
		},
		{
			nome: 'Admin User 2',
			email: 'admin2@example.com',
			senha: '$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC',
		},
		{
			nome: 'Admin User 3',
			email: 'admin3@example.com',
			senha: '$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC',
		},
	]);
}

export { seed };
