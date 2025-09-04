import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { NotFoundError } from './errors/notFound';
import { RequiredParamError } from './errors/requiredParam';
import { InvalidIDError } from './errors/invalidID';
import { FutureDateError } from './errors/futureDate';
import { $ZodIssue } from 'zod/v4/core';

function handleZodIssue(issue: $ZodIssue) {
	return {
		[issue.path.join('.')]: {
			message: issue.message,
			code: issue.code,
			input: issue.input,
		},
	};
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: Function,
) {
	console.error(err.stack);

	switch (true) {
		case err instanceof ZodError:
			return res.status(400).json({
				message: 'Parâmetros inválidos',
				errors: err.issues.map(handleZodIssue),
			});
		case err instanceof NotFoundError || err instanceof InvalidIDError:
			return res.status(404).json({
				message: err.message,
			});
		case err instanceof RequiredParamError ||
			err instanceof FutureDateError:
			return res.status(400).json({
				message: err.message,
			});
		default:
			return res.status(500).json({
				message: 'Internal server error',
			});
	}
}

export function parseId(entityName: string, id: string | undefined): number {
	if (!id) {
		throw new RequiredParamError('id');
	}
	const parsedId = parseInt(id, 10);
	if (isNaN(parsedId) || parsedId <= 0) {
		throw new InvalidIDError('Entity', parsedId);
	}

	const isFloat = id.includes('.');
	if (isFloat) {
		throw new InvalidIDError(entityName, parsedId);
	}

	return parsedId;
}
