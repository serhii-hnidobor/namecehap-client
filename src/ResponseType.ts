type NamecheapResponseError = {
	error: {
		text: string;
		number: number;
	};
};

export type BaseResponseType<T extends Record<string, unknown>> = {
	apiResponse: {
		errors: NamecheapResponseError;
		commandResponse?: T;
		status: string;
	};
};

export type GetDomainListResponse = {
	domainGetListResult:
	| {
		id: string;
		name: string;
		user: string;
		created: string;
		expires: string;
		isExpire: boolean;
		isLocked: boolean;
		autoRenew: boolean;
		whoisGuard: string;
		isPremium: boolean;
		isOurDNS: boolean;
	}
	| undefined;
	paging: {
		totalItems: number;
		currentPage: number;
		pageSize: number;
	};
	type: 'namecheap.domains.getList';
};

export type CreateDomainResponse = {
	domainCreateResult: {
		domain: string;
		registered: boolean;
		chargedAmount: number;
		domainID: number;
		orderID: number;
		transactionID: number;
		whoisguardEnable: boolean;
		nonRealTimeDomain: boolean;
	};
};

export type DomainCheckResult = {
	domain: string;
	available: boolean;
	isPremiumName: boolean;
	premiumRegistrationPrice: number;
	premiumRenewalPrice: number;
	premiumRestorePrice: number;
	premiumTransferPrice: number;
	icannFee: number;
	eapFee: number;
};

export type CheckDomainResponse = {
	domainCheckResult: DomainCheckResult[];
} & Record<string, unknown>;

export type GetDomainTldResponse = {
	tlds: {
		tld: GetDomainTld[];
	};
};

export type GetDomainTld = {
	name: string;
	nonRealTimeDomain: boolean;
	minRegisterYears: number;
	maxRegisterYears: number;
	minRenewYears: number;
	maxRenewYears: number;
	minTransferYears: number;
	maxTransferYears: number;
	isApiRegisterable: boolean;
	isApiRenewable: boolean;
	isApiTransferable: boolean;
	isEppRequired: boolean;
	isDisableModContact: boolean;
	isDisableWGAllot: boolean;
	isIncludeInExtendedSearchOnly: boolean;
	sequenceNumber: number;
	type: string;
	isSupportsIDN: boolean;
	category: string | number;
};

export type GetContact = {
	domainContactsResult: {
		registrant: {
			organizationName: number;
			jobTitle: number;
			firstName: string;
			lastName: string;
			address1: string;
			address2: number;
			city: string;
			stateProvince: string;
			stateProvinceChoice: string;
			postalCode: string;
			country: string;
			phone: number;
			fax: number;
			emailAddress: string;
			phoneExt: number;
			readOnly: boolean;
		};
		tech: {
			organizationName: number;
			jobTitle: number;
			firstName: string;
			lastName: string;
			address1: string;
			address2: number;
			city: string;
			stateProvince: string;
			stateProvinceChoice: string;
			postalCode: string;
			country: string;
			phone: number;
			fax: number;
			emailAddress: string;
			phoneExt: number;
			readOnly: boolean;
		};
		admin: {
			organizationName: number;
			jobTitle: number;
			firstName: string;
			lastName: string;
			address1: string;
			address2: number;
			city: string;
			stateProvince: string;
			stateProvinceChoice: string;
			postalCode: number;
			country: string;
			phone: number;
			fax: number;
			emailAddress: string;
			phoneExt: number;
			readOnly: boolean;
		};
		auxBilling: {
			organizationName: number;
			jobTitle: number;
			firstName: string;
			lastName: string;
			address1: string;
			address2: number;
			city: string;
			stateProvince: string;
			stateProvinceChoice: string;
			postalCode: string;
			country: string;
			phone: number;
			fax: number;
			emailAddress: string;
			phoneExt: number;
			readOnly: boolean;
		};
		domain: string;
		domainnameid: number;
	};
	type: string;
};

export type CheckResponse = {
	domainCheckResult: {
		domain: string;
		available: boolean;
		isPremiumName: boolean;
		premiumRegistrationPrice: number;
		premiumRenewalPrice: number;
		premiumRestorePrice: number;
		premiumTransferPrice: number;
		icannFee: number;
		eapFee: number;
	};
	type: string;
};

export type SetContactsResponse = {
	domainSetContactResult: {
		domain: string;
		isSuccess: boolean;
	};
	type: string;
};

export type GetRegistrarLockResponseRaw = {
	domainGetRegistrarLockResult: {
		domain: string;
		registrarLockStatus: boolean;
	};
	type: string;
};

export type GetRegistrarLockResponse =
  GetRegistrarLockResponseRaw['domainGetRegistrarLockResult'];

export type SetRegistrarLockResponseRaw = {
	domainSetRegistrarLockResult: {
		domain: string;
		isSuccess: boolean;
	};
	type: string;
};

export type SetRegistrarLockResponse =
  SetRegistrarLockResponseRaw['domainSetRegistrarLockResult'];

export type GetInfoResponseRaw = {
	domainGetInfoResult: {
		status: 'OK' | 'Locked' | 'Expired';
		iD: number;
		domainName: string;
		ownerName: string;
		isOwner: boolean;
		isPremium: boolean;
	};
	type: string;
};

export type GetInfoResponse = GetInfoResponseRaw['domainGetInfoResult'];

export type SetDefaultDnsResponseRaw = {
	domainDNSSetDefaultResult: {
		domain: string;
		updated: boolean;
	};
	type: string;
};

export type SetDefaultDnsResponse =
  SetDefaultDnsResponseRaw['domainDNSSetDefaultResult'];

export type SetCustomDnsResponseRaw = {
	domainDNSSetCustomResult: {
		domain: string;
		updated: boolean;
	};
	type: string;
};

export type SetCustomDnsResponse =
  SetCustomDnsResponseRaw['domainDNSSetCustomResult'];

export type GetDnsListResponseRaw = {
	domainDNSGetListResult: {
		domain: string;
		nameserver: ['leia.ns.cloudflare.com', 'woz.ns.cloudflare.com'];
		isUsingOurDNS: boolean;
		isPremiumDNS: boolean;
		isUsingFreeDNS: boolean;
	};
	type: string;
};

export type GetDnsListResponse =
  GetDnsListResponseRaw['domainDNSGetListResult'];

export type GetDnsHostResponseRaw = {
	domainDNSGetHostsResult: {
		domain: string;
		isUsingOurDNS: boolean;
		emailType: string;
		host: Array<{
			hostId: number;
			name: string;
			type: string;
			address: string;
			mXPref?: number;
			tTL: number;
			associatedAppTitle: number | string;
			friendlyName: number | string;
			isActive: boolean;
			isDDNSEnabled: boolean;
		}>;
	};
	type: string;
};

export type GetDnsHostResponse = {
	domain: string;
	isUsingOurDNS: boolean;
	emailType: string;
	host: Array<{
		hostId: number;
		name: string;
		type: string;
		address: string;
		mxPref?: number;
		ttl: number;
		associatedAppTitle: number | string;
		friendlyName: number | string;
		isActive: boolean;
		isDDNSEnabled: boolean;
	}>;
};

export type GetDnsEmailForwardingResponseRaw = {
	domainDNSGetEmailForwardingResult: {
		domain: string;
		forward?: Array<{mailbox: string}>;
	};
	type: string;
};

export type GetDnsEmailForwardingResponse =
  GetDnsEmailForwardingResponseRaw['domainDNSGetEmailForwardingResult'];

export type SetDnsEmailForwardingResponseRaw = {
	domainDNSSetEmailForwardingResult: {
		domain: string;
		isSuccess: boolean;
	};
	type: string;
};

export type SetDnsEmailForwardingResponse =
  SetDnsEmailForwardingResponseRaw['domainDNSSetEmailForwardingResult'];

export type CreateNsResponseRaw = {
	domainNSCreateResult: {
		domain: string;
		nameserver: string;
		iP: string;
		isSuccess: string;
	};
};

export type CreateNsResponse = {
	domain: string;
	nameserver: string;
	ip: string;
	isSuccess: string;
};
