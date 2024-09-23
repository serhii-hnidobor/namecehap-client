export enum DomainsGetListSortBy {
	NAME = 'NAME',
	NAME_DESC = 'NAME_DESC',
	EXPIREDATE = 'EXPIREDATE',
	EXPIREDATE_DESC = 'EXPIREDATE_DESC',
	CREATEDATE = 'CREATEDATE',
	CREATEDATE_DESC = 'CREATEDATE_DESC',
}

export type StringOrNumber = number | string | symbol;

export enum DomainsGetListType {
	ALL = 'ALL',
	EXPIRING = 'EXPIRING',
	EXPIRED = 'EXPIRED',
}

export type GetDomainsListRequest = {
	listType?: DomainsGetListType;
	searchTerm?: string;
	page?: number;
	pageSize?: number;
	sortBy?: DomainsGetListSortBy;
};

export type IdnCode =
  | 'afr'
  | 'alb'
  | 'ara'
  | 'arg'
  | 'arm'
  | 'asm'
  | 'ast'
  | 'ave'
  | 'awa'
  | 'aze'
  | 'bak'
  | 'bal'
  | 'ban'
  | 'baq'
  | 'bas'
  | 'bel'
  | 'ben'
  | 'bho'
  | 'bos'
  | 'bul'
  | 'bur'
  | 'car'
  | 'cat'
  | 'che'
  | 'chi'
  | 'chv'
  | 'cop'
  | 'cos'
  | 'cze'
  | 'dan'
  | 'div'
  | 'doi'
  | 'dut'
  | 'eng'
  | 'est'
  | 'fao'
  | 'fij'
  | 'fin'
  | 'fre'
  | 'fry'
  | 'geo'
  | 'ger'
  | 'gla'
  | 'gle'
  | 'gon'
  | 'gre'
  | 'guj'
  | 'heb'
  | 'hin'
  | 'hun'
  | 'inc'
  | 'ind'
  | 'inh'
  | 'isl'
  | 'ita'
  | 'jav'
  | 'jpn'
  | 'kas'
  | 'kaz'
  | 'khm'
  | 'kir'
  | 'kor'
  | 'kur'
  | 'lao'
  | 'lav'
  | 'lit'
  | 'ltz'
  | 'mal'
  | 'mkd'
  | 'mlt'
  | 'mol'
  | 'mon'
  | 'mri'
  | 'msa'
  | 'nep'
  | 'nor'
  | 'ori'
  | 'oss'
  | 'pan'
  | 'per'
  | 'pol'
  | 'por'
  | 'pus'
  | 'raj'
  | 'rum'
  | 'rus'
  | 'san'
  | 'scr'
  | 'sin'
  | 'slo'
  | 'slv'
  | 'smo'
  | 'snd'
  | 'som'
  | 'spa'
  | 'srd'
  | 'srp'
  | 'swa'
  | 'swe'
  | 'syr'
  | 'tam'
  | 'tel'
  | 'tgk'
  | 'tha'
  | 'tib'
  | 'tur'
  | 'ukr'
  | 'urd'
  | 'uzb'
  | 'vie'
  | 'wel'
  | 'yid';

export type DomainRegistrationRequest = {
	domainName: string;
	years: number;
	promotionCode?: string;
	registrantOrganizationName?: string;
	registrantJobTitle?: string;
	registrantFirstName: string;
	registrantLastName: string;
	registrantAddress1: string;
	registrantAddress2?: string;
	registrantCity: string;
	registrantStateProvince: string;
	registrantStateProvinceChoice?: string;
	registrantPostalCode: string;
	registrantCountry: string;
	registrantPhone: string;
	registrantPhoneExt?: string;
	registrantFax?: string;
	registrantEmailAddress: string;
	techOrganizationName?: string;
	techJobTitle?: string;
	techFirstName: string;
	techLastName: string;
	techAddress1: string;
	techAddress2?: string;
	techCity: string;
	techStateProvince: string;
	techStateProvinceChoice?: string;
	techPostalCode: string;
	techCountry: string;
	techPhone: string;
	techPhoneExt?: string;
	techFax?: string;
	techEmailAddress: string;
	adminOrganizationName?: string;
	adminJobTitle?: string;
	adminFirstName: string;
	adminLastName: string;
	adminAddress1: string;
	adminAddress2?: string;
	adminCity: string;
	adminStateProvince: string;
	adminStateProvinceChoice?: string;
	adminPostalCode: string;
	adminCountry: string;
	adminPhone: string;
	adminPhoneExt?: string;
	adminFax?: string;
	adminEmailAddress: string;
	auxBillingOrganizationName?: string;
	auxBillingJobTitle?: string;
	auxBillingFirstName: string;
	auxBillingLastName: string;
	auxBillingAddress1: string;
	auxBillingAddress2?: string;
	auxBillingCity: string;
	auxBillingStateProvince: string;
	auxBillingStateProvinceChoice?: string;
	auxBillingPostalCode: string;
	auxBillingCountry: string;
	auxBillingPhone: string;
	auxBillingPhoneExt?: string;
	auxBillingFax?: string;
	auxBillingEmailAddress: string;
	billingFirstName?: string;
	billingLastName?: string;
	billingAddress1?: string;
	billingAddress2?: string;
	billingCity?: string;
	billingStateProvince?: string;
	billingStateProvinceChoice?: string;
	billingPostalCode?: string;
	billingCountry?: string;
	billingPhone?: string;
	billingPhoneExt?: string;
	billingFax?: string;
	billingEmailAddress?: string;
	idnCode?: IdnCode;
	nameservers?: string;
	addFreeWhoisguard?: 'yes' | 'no';
	wgEnabled?: 'yes' | 'no';
	isPremiumDomain?: boolean;
	premiumPrice?: string;
	eapFee?: string;
};

export type DomainSetContactsRequest = {
	domainName: string;
	registrantOrganizationName?: string;
	registrantJobTitle?: string;
	registrantFirstName: string;
	registrantLastName: string;
	registrantAddress1: string;
	registrantAddress2?: string;
	registrantCity: string;
	registrantStateProvince: string;
	registrantStateProvinceChoice?: string;
	registrantPostalCode: string;
	registrantCountry: string;
	registrantPhone: string;
	registrantPhoneExt?: string;
	registrantFax?: string;
	registrantEmailAddress: string;
	techOrganizationName?: string;
	techJobTitle?: string;
	techFirstName: string;
	techLastName: string;
	techAddress1: string;
	techAddress2?: string;
	techCity: string;
	techStateProvince: string;
	techStateProvinceChoice?: string;
	techPostalCode: string;
	techCountry: string;
	techPhone: string;
	techPhoneExt?: string;
	techFax?: string;
	techEmailAddress: string;
	adminOrganizationName?: string;
	adminJobTitle?: string;
	adminFirstName: string;
	adminLastName: string;
	adminAddress1: string;
	adminAddress2?: string;
	adminCity: string;
	adminStateProvince: string;
	adminStateProvinceChoice?: string;
	adminPostalCode: string;
	adminCountry: string;
	adminPhone: string;
	adminPhoneExt?: string;
	adminFax?: string;
	adminEmailAddress: string;
	auxBillingOrganizationName?: string;
	auxBillingJobTitle?: string;
	auxBillingFirstName: string;
	auxBillingLastName: string;
	auxBillingAddress1: string;
	auxBillingAddress2?: string;
	auxBillingCity: string;
	auxBillingStateProvince: string;
	auxBillingStateProvinceChoice?: string;
	auxBillingPostalCode: string;
	auxBillingCountry: string;
	auxBillingPhone: string;
	auxBillingPhoneExt?: string;
	auxBillingFax?: string;
	auxBillingEmailAddress: string;
	extendedAttributes?: string;
};

export type GetRegistrarLockRequest = {
	domainName: string;
};

export type CheckDomainRequest = {
	domainList: string | string[];
};

export type SetRegistrarLockRequest = {
	domainName: string;
	lockAction: 'LOCK' | 'UNLOCK';
};

export type GetInfoRequest = {
	domainName: string;
	hostName?: string;
};

export type SetDefaultDnsRequest = {
	domainName: string;
};

export type SetCustomDnsRequest = {
	nameservers: string[];
} & SetDefaultDnsRequest;

export type GetDnsList = {
	domainName: string;
};

export type GetDnsHosts = {
	domainName: string;
};

export type GetDnsEmailForwardingRequest = {
	domainName: string;
};

export type SetDnsEmailForwardingRequest = {
	domainName: string;
	mailBoxList: string[];
	forwardToList: string[];
};

export type NsCreateRequest = {
	domainName: string;
	nameserver: string;
	ip: string;
};
