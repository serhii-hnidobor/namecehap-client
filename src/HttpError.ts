import {STATUS_CODES} from 'http';

function upperCamelCase(str: string) {
	const words = str.split(/[\s_]+/);

	const upperCasedWords = words.map(
		word => word.charAt(0).toUpperCase() + word.slice(1),
	);

	return upperCasedWords.join('');
}

class HttpError extends Error {
	private readonly statusCode: number;

	constructor(code: number, message: string, extras: Record<string, unknown>) {
		super(message || STATUS_CODES[code]);
		if (arguments.length >= 3 && extras) {
			Object.assign(this, extras);
		}

		this.name = toName(code);
		this.statusCode = code;
	}
}

export function toName(code: number) {
	const suffix
    = ((code / 100) | 0) === 4 || ((code / 100) | 0) === 5 ? 'error' : '';

	return upperCamelCase(
		String(STATUS_CODES[code]).replace(/error$/i, '') + suffix,
	);
}

export default HttpError;
