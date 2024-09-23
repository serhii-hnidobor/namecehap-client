/**
 * @module HTTPClient
 */

import HttpError from './HttpError';
import {NamecheapError} from './NamecheapError';
import {type BaseResponseType} from './ResponseType';
import {arrayLikeObject2Array} from './Utils';
import {parseXmlResponse} from './XMLResponseParse';

type ParseRequestJsonResponse = BaseResponseType<
Record<string, unknown>
>['apiResponse'];

/**
 * @class
 * Class for HTTP client
 */
export class HttpClient {
	public createRequest(
		input: RequestInfo | URL,
		init?: RequestInit | undefined,
	) {
		return new Request(input, init);
	}

	public async sendRequest<T extends Record<string, unknown>>(
		request: Request,
		requestOption?: RequestInit,
	) {
		const response = await fetch(request, requestOption);
		return this.parseRequest<T>(response);
	}

	private async parseRequest<T extends Record<string, unknown>>(
		response: Response,
	): Promise<T> {
		if (!response.ok) {
			throw new HttpError(response.status, response.statusText, {response});
		}

		const {apiResponse: jsonResponse}
      = await parseXmlResponse<BaseResponseType<T>>(response);

		if (jsonResponse.status.toLowerCase() === 'error') {
			const {text, number} = jsonResponse.errors.error;
			throw new NamecheapError(number, text);
		}

		return arrayLikeObject2Array<ParseRequestJsonResponse>(jsonResponse)
			.commandResponse as T;
	}
}
