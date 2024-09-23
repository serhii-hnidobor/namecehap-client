import {NamecheapError} from './NamecheapError';
import {checkIsXmlResponse, objectKeysLowerCaseFirstChar} from './Utils';
import XMLParser from './XMLParser';

/**
 * @module XMLResponseParse
 */

/**
 * Converts a string to the appropriate type (boolean or number).
 * @param value - The string value to convert.
 * @returns The converted value.
 */
function convertStringToType(value: string): boolean | number | string {
	const lowerCaseValue = value.toLowerCase();

	if (lowerCaseValue === 'true') {
		return true;
	}

	if (lowerCaseValue === 'false') {
		return false;
	}

	const numericValue = Number(lowerCaseValue);
	return isNaN(numericValue) ? value : numericValue;
}

/**
 * Converts string values in a parsed XML response to appropriate types.
 * @param parsedResponse - Parsed XML response object.
 * @returns The converted value.
 */
function convertXmlValues(parsedResponse: Record<string, unknown>) {
	for (const key of Object.keys(parsedResponse)) {
		const value = parsedResponse[key];

		if (typeof value === 'string') {
			parsedResponse[key] = convertStringToType(value);
		} else if (typeof value === 'object' && value) {
			convertXmlValues(value as Record<string, unknown>);
		}
	}

	return parsedResponse;
}

/**
 * @function
 * parse xml response
 */
export async function parseXmlResponse<T extends Record<string, unknown>>(
	response: Response,
): Promise<T> {
	const isXmlResponse = checkIsXmlResponse(response);

	if (!isXmlResponse) {
		throw new NamecheapError(-1, 'invalid response type');
	}

	const xmlRaw = await response.text();

	const camelizedResponse = objectKeysLowerCaseFirstChar(
		XMLParser.parse(xmlRaw) as Record<string, unknown>,
	);

	return convertXmlValues(camelizedResponse) as T;
}
