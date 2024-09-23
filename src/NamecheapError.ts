/**
 * @module GraphError
 */

/**
 * @class
 * Class for NamecheapError
 */

export class NamecheapError extends Error {
	/**
   * @public
   * A member holding code i.e name of the error
   */
	public code: number | undefined;

	/**
   * @public
   * A member holding processed date and time of the request
   */
	public date: Date;

	/**
   * @public
   * A member holding original namecheap error message
   */
	public message: any;

	/**
   * @public
   * @constructor
   * Creates an instance of GraphError
   * @param {number} [code = -1] - The status code of the error
   * @param {string} [message] - The message of the error
   * @param {Error} [baseError] - The base error
   * @returns An instance of GraphError
   */
	public constructor(code = -1, message?: string, baseError?: Error) {
		super(message ?? baseError?.message);
		Object.setPrototypeOf(this, NamecheapError.prototype);
		this.code = code;
		this.date = new Date();
		this.stack = baseError ? baseError.stack : this.stack;
	}
}
