import {type QueryParam} from './IQueryParam';
import {NamecheapError} from './NamecheapError';
import {type StringOrNumber} from './RequestType';

export function lowerCaseFirstChar(str: string) {
	const firstChar = str[0];
	if (firstChar.toUpperCase() === firstChar) {
		return firstChar.toLowerCase() + str.slice(1);
	}

	return str;
}

export function upperCaseFirstChar(str: string) {
	const firstChar = str[0];
	if (firstChar.toLowerCase() === firstChar) {
		return firstChar.toUpperCase() + str.slice(1);
	}

	return str;
}

export function objectKeysUpperCaseFirstChar<T extends Record<string, unknown>>(
	object: T,
): T {
	const firstCharUppercaseObject: Record<string, unknown> = {};

	for (const key of Object.keys(object)) {
		const keyWithoutSpecialSymbol = key.replace('#', '');

		let value = object[key];

		if (typeof value === 'object' && value) {
			value = objectKeysUpperCaseFirstChar(value as Record<string, unknown>);
		}

		const firstCharLowercaseKey = upperCaseFirstChar(keyWithoutSpecialSymbol);

		firstCharUppercaseObject[firstCharLowercaseKey] = value;
	}

	return firstCharUppercaseObject as T;
}

export function objectKeysLowerCaseFirstChar(object: Record<string, unknown>) {
	const firstCharLowercaseObject: Record<string, unknown> = {};

	for (const key of Object.keys(object)) {
		const keyWithoutSpecialSymbol = key.replace('#', '');

		let value = object[key];

		if (typeof value === 'object' && value) {
			value = objectKeysLowerCaseFirstChar(value as Record<string, unknown>);
		}

		const firstCharLowercaseKey = lowerCaseFirstChar(keyWithoutSpecialSymbol);

		firstCharLowercaseObject[firstCharLowercaseKey] = value;
	}

	return firstCharLowercaseObject;
}

export function checkIsAllObjectKeyIsNumber(
	object: Record<StringOrNumber, unknown>,
) {
	let isAllObjectKeyIsNumber = true;
	for (const key of Object.keys(object)) {
		if (Number.isNaN(Number(key))) {
			isAllObjectKeyIsNumber = false;
			break;
		}
	}

	return isAllObjectKeyIsNumber;
}

export function arrayLikeObject2Array<T>(object: Record<string, unknown>): T {
	for (const key of Object.keys(object)) {
		const value = object[key];

		if (typeof value === 'object' && value && !Array.isArray(value)) {
			object[key] = arrayLikeObject2Array(
				value as Record<StringOrNumber, unknown>,
			);
		}
	}

	const isAllObjectKeyIsNumber = checkIsAllObjectKeyIsNumber(object);

	if (!isAllObjectKeyIsNumber) {
		return object as T;
	}

	return Array.from({...object, length: Object.keys(object).length}) as T;
}

/**
 * @function
 * To check is XML response
 * @param {Response} response - The http response
 * @returns {boolean} - is response type xml
 */
export function checkIsXmlResponse(response: Response): boolean {
	if (!response) {
		throw new NamecheapError(-1, 'no response');
	}

	const contentType = response.headers.get('Content-Type');

	return contentType?.includes('xml') ?? false;
}

/**
 * @function
 * To add query param to request
 * @param {Request} request - The http request
 * @param {Record<string, unknown>} queryParamsObject - The object of query params that need to add
 * @returns Nothing
 */
export function addQueryParams(
	request: Request,
	queryParamsObject: Record<string, unknown>,
) {
	const queryParams = object2QueryParams(queryParamsObject);
	const {url} = request;

	const urlObject = new URL(url);

	for (const {name: queryParamName, value: queryParamValue} of queryParams) {
		urlObject.searchParams.set(queryParamName, queryParamValue);
	}

	return new Request(urlObject.toString(), request);
}

function isStringNumberOrBoolean(value: unknown) {
	return (
		typeof value === 'number'
    || typeof value === 'string'
    || typeof value === 'boolean'
	);
}

/**
 * @function
 * To convert object to query http request params
 * @param {Record<string, string>} object - The object that need to convert
 * @returns {Array<QueryParam>}
 */
export function object2QueryParams(
	object: Record<string, unknown>,
): QueryParam[] {
	const queryParams: QueryParam[] = [];

	for (const key of Object.keys(object)) {
		const value = object[key];
		if (isStringNumberOrBoolean(value)) {
			queryParams.push({
				name: key,
				value: String(value),
			});
		}
	}

	return queryParams;
}

/**
 * @function
 * To get tld and sld from domain name
 * @param {string} domainName - The domain name
 * @returns {{tld: string, sld: string}}
 */
export function getSldAndTldFromDomain(domainName: string) {
	const domainParts = domainName.split('.');

	const tld = domainParts.pop();
	const sld = domainParts.pop();

	if (!tld || !sld) {
		throw new Error('Invalid domain format');
	}

	return {tld, sld};
}
