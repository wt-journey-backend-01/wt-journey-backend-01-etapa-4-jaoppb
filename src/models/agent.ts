import z from 'zod';

const agentId = z.int().meta({
	description: 'Unique identifier for the agent',
	example: 1,
});

const nome = z.string().min(2).max(100).meta({
	description: 'Name of the agent',
	example: 'John Doe',
});

const dataDeIncorporacao = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/)
	.meta({
		description: 'Incorporation date of the agent',
		example: '2023-01-01',
	});

const cargo = z.string().min(2).max(100).meta({
	description: 'Position of the agent',
	example: 'Delegate',
});

const AgentSchema = z
	.object({
		id: agentId,
		nome,
		dataDeIncorporacao,
		cargo,
	})
	.meta({
		id: 'Agent',
		description: 'Schema for an agent in the system',
		example: {
			id: 1,
			nome: 'John Doe',
			dataDeIncorporacao: '2023-01-01',
			cargo: 'Sales Manager',
		},
	})
	.strict();

export default AgentSchema;
export type Agent = z.infer<typeof AgentSchema>;
