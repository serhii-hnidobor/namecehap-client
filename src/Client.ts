import {
	API_KEY_MAX_LENGTH,
	API_USER_MAX_LENGTH,
	CLIENT_IP_MAX_LENGTH,
	NAMECHEAP_BASE_URL,
	USER_NAME_MAX_LENGTH,
} from './Constants';
import {HttpClient} from './HTTPClient';
import {type GlobalParam} from './IGlobalParam';
import {NamecheapCommand} from './NamecheapCommand';
import {NamecheapError} from './NamecheapError';
import {RequestMethod} from './RequestMethod';
import {
	type NsCreateRequest,
	type SetDnsEmailForwardingRequest,
	type CheckDomainRequest,
	type DomainRegistrationRequest,
	type DomainSetContactsRequest,
	type GetDnsEmailForwardingRequest,
	type GetDnsHosts,
	type GetDnsList,
	type GetDomainsListRequest,
	type GetInfoRequest,
	type GetRegistrarLockRequest,
	type SetCustomDnsRequest,
	type SetDefaultDnsRequest,
	type SetRegistrarLockRequest,
} from './RequestType';
import {
	type CreateNsResponse,
	type CreateNsResponseRaw,
	type SetDnsEmailForwardingResponse,
	type SetDnsEmailForwardingResponseRaw,
	type CheckDomainResponse,
	type CheckResponse,
	type CreateDomainResponse,
	type GetContact,
	type GetDnsEmailForwardingResponse,
	type GetDnsEmailForwardingResponseRaw,
	type GetDnsHostResponse,
	type GetDnsHostResponseRaw,
	type GetDnsListResponse,
	type GetDnsListResponseRaw,
	type GetDomainListResponse,
	type GetDomainTldResponse,
	type GetInfoResponse,
	type GetInfoResponseRaw,
	type GetRegistrarLockResponse,
	type GetRegistrarLockResponseRaw,
	type SetContactsResponse,
	type SetCustomDnsResponse,
	type SetCustomDnsResponseRaw,
	type SetDefaultDnsResponse,
	type SetDefaultDnsResponseRaw,
	type SetRegistrarLockResponse,
	type SetRegistrarLockResponseRaw,
} from './ResponseType';
import {
	addQueryParams,
	getSldAndTldFromDomain,
	objectKeysUpperCaseFirstChar,
} from './Utils';

/**
 * @module Client
 */
export class Client {
	/**
   * @private
   * A member representing the http client
   **/
	private readonly httpClient: HttpClient;

	/**
   * @private
   * A member representing the namecheap global param
   **/
	private readonly globalParam: GlobalParam;

	constructor(globalParam: GlobalParam) {
		this.validateGlobalParam(globalParam);
		this.httpClient = new HttpClient();
		this.globalParam = globalParam;
	}

	/**
   * @public
   * To validate global params
   * @param {globalParam} globalParam - global param object
   * @returns Nothing
   */
	validateGlobalParam({clientIP, username, apiKey, apiUser}: GlobalParam) {
		if (clientIP.length > CLIENT_IP_MAX_LENGTH) {
			throw new NamecheapError(
				-1,
				`client ip max length is ${CLIENT_IP_MAX_LENGTH}`,
			);
		} else if (apiUser.length > API_USER_MAX_LENGTH) {
			throw new NamecheapError(
				-1,
				`client user max length is ${API_USER_MAX_LENGTH}`,
			);
		} else if (apiKey.length > API_KEY_MAX_LENGTH) {
			throw new NamecheapError(
				-1,
				`client api key max length is ${API_KEY_MAX_LENGTH}`,
			);
		} else if (username.length > USER_NAME_MAX_LENGTH) {
			throw new NamecheapError(
				-1,
				`client username max length is ${USER_NAME_MAX_LENGTH}`,
			);
		}
	}

	async domainsGetList(params: GetDomainsListRequest) {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.DOMAINS_GET_LIST,
			...params,
		});

		const domainGetListRequest = addQueryParams(request, queryParam);

		const domainList
      = await this.httpClient.sendRequest<GetDomainListResponse>(
      	domainGetListRequest,
      );

		if (typeof domainList?.domainGetListResult === 'number') {
			domainList.domainGetListResult = undefined;
		}

		return domainList;
	}

	async createDomain(params: DomainRegistrationRequest) {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.POST,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.CREATE_DOMAIN,
			...params,
		});

		const createDomainRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<CreateDomainResponse>(
			createDomainRequest,
		);
	}

	async checkDomainAvailability(params: CheckDomainRequest) {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {domainList} = params;

		params.domainList = Array.isArray(domainList)
			? domainList.join(',')
			: domainList;

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.CHECK_DOMAIN_AVAILABILITY,
			...params,
		});

		const checkDomainRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<CheckDomainResponse>(checkDomainRequest);
	}

	async getTldList() {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_TLD_LIST,
		});

		const getTldListRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<GetDomainTldResponse>(getTldListRequest);
	}

	async getContacts(domainName: string): Promise<GetContact> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_CONTACTS,
			domainName,
		});

		const getContactsRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<GetContact>(getContactsRequest);
	}

	async check({domainList}: CheckDomainRequest): Promise<CheckResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const parsedDomainList = Array.isArray(domainList)
			? domainList.join(',')
			: domainList;

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.CHECK_DOMAIN_AVAILABILITY,
			domainList: parsedDomainList,
		});

		const getContactsRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<CheckResponse>(getContactsRequest);
	}

	async setContacts(
		payload: DomainSetContactsRequest,
	): Promise<SetContactsResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.SET_CONTACTS,
			...payload,
		});

		const setContactsRequest = addQueryParams(request, queryParam);

		return this.httpClient.sendRequest<SetContactsResponse>(setContactsRequest);
	}

	async getRegistrarLock(
		payload: GetRegistrarLockRequest,
	): Promise<GetRegistrarLockResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_REGISTRAR_LOCK,
			...payload,
		});

		const getRegistrarLockRequest = addQueryParams(request, queryParam);

		const {domainGetRegistrarLockResult}
      = await this.httpClient.sendRequest<GetRegistrarLockResponseRaw>(
      	getRegistrarLockRequest,
      );

		return domainGetRegistrarLockResult;
	}

	async setRegistrarLock(
		payload: SetRegistrarLockRequest,
	): Promise<SetRegistrarLockResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.SET_REGISTRAR_LOCK,
			...payload,
		});

		const setRegistrarLockRequest = addQueryParams(request, queryParam);

		const {domainSetRegistrarLockResult}
      = await this.httpClient.sendRequest<SetRegistrarLockResponseRaw>(
      	setRegistrarLockRequest,
      );

		return domainSetRegistrarLockResult;
	}

	async getInfo(payload: GetInfoRequest): Promise<GetInfoResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_INFO,
			...payload,
		});

		const getInfoRequest = addQueryParams(request, queryParam);

		const {domainGetInfoResult}
      = await this.httpClient.sendRequest<GetInfoResponseRaw>(getInfoRequest);

		return domainGetInfoResult;
	}

	async setDefaultDns({
		domainName,
	}: SetDefaultDnsRequest): Promise<SetDefaultDnsResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.SET_DEFAULT_DNS,
			TLD: tld,
			SLD: sld,
		});

		const setDefaultDnsRequest = addQueryParams(request, queryParam);

		const {domainDNSSetDefaultResult}
      = await this.httpClient.sendRequest<SetDefaultDnsResponseRaw>(
      	setDefaultDnsRequest,
      );

		return domainDNSSetDefaultResult;
	}

	async setCustomDns({
		domainName,
		nameservers,
	}: SetCustomDnsRequest): Promise<SetCustomDnsResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const nameserversQuery = nameservers.join(',').replaceAll(' ', '');

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.SET_CUSTOM_DNS,
			TLD: tld,
			SLD: sld,
			nameservers: nameserversQuery,
		});

		const setCustomDnsRequest = addQueryParams(request, queryParam);

		const {domainDNSSetCustomResult}
      = await this.httpClient.sendRequest<SetCustomDnsResponseRaw>(
      	setCustomDnsRequest,
      );

		return domainDNSSetCustomResult;
	}

	async getDnsList({domainName}: GetDnsList): Promise<GetDnsListResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_DNS_LIST,
			TLD: tld,
			SLD: sld,
		});

		const getDnsListRequest = addQueryParams(request, queryParam);

		const {domainDNSGetListResult}
      = await this.httpClient.sendRequest<GetDnsListResponseRaw>(
      	getDnsListRequest,
      );

		return domainDNSGetListResult;
	}

	async getDnsHosts({domainName}: GetDnsHosts): Promise<GetDnsHostResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_DNS_HOSTS,
			TLD: tld,
			SLD: sld,
		});

		const getDnsHostRequest = addQueryParams(request, queryParam);

		const {domainDNSGetHostsResult}
      = await this.httpClient.sendRequest<GetDnsHostResponseRaw>(
      	getDnsHostRequest,
      );

		const hostWithFixedKeyNames = domainDNSGetHostsResult.host.map(
			({tTL, mXPref, ...restData}) => ({
				...restData,
				ttl: tTL,
				mxPref: mXPref,
			}),
		);

		return {...domainDNSGetHostsResult, host: hostWithFixedKeyNames};
	}

	async getDnsEmailForwarding({
		domainName,
	}: GetDnsEmailForwardingRequest): Promise<GetDnsEmailForwardingResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.GET_DNS_EMAIL_FORWARDING,
			domainName,
		});

		const getDnsEmailForwardingRequest = addQueryParams(request, queryParam);

		const {domainDNSGetEmailForwardingResult}
      = await this.httpClient.sendRequest<GetDnsEmailForwardingResponseRaw>(
      	getDnsEmailForwardingRequest,
      );

		return domainDNSGetEmailForwardingResult;
	}

	async setDnsEmailForwarding({
		domainName,
		forwardToList,
		mailBoxList,
	}: SetDnsEmailForwardingRequest): Promise<SetDnsEmailForwardingResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const parsedForwardToObject: Record<string, string> = {};
		const parsedMailBoxObject: Record<string, string> = {};

		forwardToList.forEach((forwardTo, index) => {
			parsedForwardToObject[`ForwardTo${index + 1}`] = forwardTo;
		});
		mailBoxList.forEach((mailBox, index) => {
			parsedMailBoxObject[`MailBox${index + 1}`] = mailBox;
		});

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.SET_DNS_EMAIL_FORWARDING,
			domainName,
			...parsedForwardToObject,
			...parsedMailBoxObject,
		});

		const setDnsEmailForwardingRequest = addQueryParams(request, queryParam);

		const {domainDNSSetEmailForwardingResult}
      = await this.httpClient.sendRequest<SetDnsEmailForwardingResponseRaw>(
      	setDnsEmailForwardingRequest,
      );

		return domainDNSSetEmailForwardingResult;
	}

	async createNs({
		domainName,
		ip,
		...restArg
	}: NsCreateRequest): Promise<CreateNsResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.NS_CREATE,
			TLD: tld,
			SLD: sld,
			...restArg,
			IP: ip,
		});

		const createNsRequest = addQueryParams(request, queryParam);

		console.log(createNsRequest.url, 'qqqq');

		const {
			domainNSCreateResult: {iP, ...restResult},
		} = await this.httpClient.sendRequest<CreateNsResponseRaw>(createNsRequest);

		return {
			...restResult,
			ip: iP,
		};
	}

	async getNsInfo({
		domainName,
		...restArg
	}: NsCreateRequest): Promise<CreateNsResponse> {
		const request = this.httpClient.createRequest(NAMECHEAP_BASE_URL, {
			method: RequestMethod.GET,
		});

		const {tld, sld} = getSldAndTldFromDomain(domainName);

		const queryParam = objectKeysUpperCaseFirstChar<Record<string, unknown>>({
			...this.globalParam,
			command: NamecheapCommand.NS_CREATE,
			TLD: tld,
			SLD: sld,
			...restArg,
		});

		const createNsRequest = addQueryParams(request, queryParam);

		const {
			domainNSCreateResult: {iP, ...restResult},
		} = await this.httpClient.sendRequest<CreateNsResponseRaw>(createNsRequest);

		return {
			...restResult,
			ip: iP,
		};
	}
}
