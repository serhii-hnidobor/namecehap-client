# Namecheap Client Library

## Overview

This library provides a client for interacting with the Namecheap API. It allows you to perform various operations related to domain registration, DNS management, and email forwarding.

## Installation

You can install this library using npm:

```bash
npm install namecheap-client
```

## API Methods

| Method                          | Description                                           | Parameters                                                                                             |
|---------------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `domainsGetList`               | Fetch a list of domains associated with your account | `params`: Object containing:<br>- `listType`: (optional) Type of domains to fetch, e.g., `ALL`, `EXPIRING`, `EXPIRED`.<br>- `searchTerm`: (optional) Term to search in domain names.<br>- `page`: (optional) Page number for pagination.<br>- `pageSize`: (optional) Number of domains per page.<br>- `sortBy`: (optional) Sort order, e.g., `NAME`, `EXPIREDATE`.                      |
| `createDomain`                  | Register a new domain                                | `params`: Object containing domain registration details, such as:<br>- `domainName`: Name of the domain.<br>- `years`: Number of years to register the domain.<br>- `registrantFirstName`: First name of the registrant.<br>- `registrantLastName`: Last name of the registrant.<br>- Other registrant and admin details (address, phone, etc.) are also required or optional based on your needs. |
| `checkDomainAvailability`       | Check if a domain is available for registration      | `params`:<br>- `domainList`: A single domain or an array of domains (string or string[]) to check availability. |
| `getTldList`                   | Retrieve the list of top-level domains (TLDs)       | No parameters required.                                                                                 |
| `getContacts`                   | Get contact details for a specific domain            | `domainName`: (string) Name of the domain to fetch contacts for.                                   |
| `check`                         | Check domain availability (alias for `checkDomainAvailability`) | `domainList`: (string | string[]) A single domain or an array of domains to check availability. |
| `setContacts`                   | Set contact details for a specific domain            | `payload`: Object containing contact details, including:<br>- `domainName`: Name of the domain.<br>- Other registrant, tech, and admin contact details (address, phone, etc.) as needed. |
| `getRegistrarLock`              | Get registrar lock status for a domain               | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain to check.                   |
| `setRegistrarLock`              | Set registrar lock for a domain                       | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain.<br>- `lockAction`: (string) Action to perform, either `LOCK` or `UNLOCK`. |
| `getInfo`                       | Get information about a specific domain              | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain.<br>- `hostName`: (optional) Specific host name to check. |
| `setDefaultDns`                 | Set default DNS for a domain                          | `domainName`: (string) Name of the domain to set default DNS for.                                   |
| `setCustomDns`                  | Set custom DNS for a domain                           | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain.<br>- `nameservers`: (array of strings) Custom nameservers to set. |
| `getDnsList`                    | Get DNS records for a domain                          | `domainName`: (string) Name of the domain to fetch DNS records for.                                 |
| `getDnsHosts`                   | Get DNS hosts for a domain                            | `domainName`: (string) Name of the domain to fetch DNS hosts for.                                  |
| `getDnsEmailForwarding`         | Get email forwarding settings for a domain            | `domainName`: (string) Name of the domain to fetch email forwarding settings for.                   |
| `setDnsEmailForwarding`         | Set email forwarding for a domain                     | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain.<br>- `mailBoxList`: (array of strings) Email addresses for mailboxes.<br>- `forwardToList`: (array of strings) Email addresses to forward to. |
| `createNs`                      | Create a nameserver for a domain                      | `payload`: Object containing:<br>- `domainName`: (string) Name of the domain.<br>- `nameserver`: (string) Name of the new nameserver.<br>- `ip`: (string) IP address for the nameserver. |

## Usage

### Importing the Client

To use the client, import it and initialize it with your Namecheap global parameters.

```javascript
import { Client } from 'namecheap-client';
import { GlobalParam } from './IGlobalParam';

const globalParam: GlobalParam = {
clientIP: 'YOUR_CLIENT_IP',
username: 'YOUR_USERNAME',
apiKey: 'YOUR_API_KEY',
apiUser: 'YOUR_API_USER',
};

const client = new Client(globalParam);
```

### Run tests
For run test specify your demo account credential in file ```tests/setEnvVars.js``` and then run ```npm run test``` 

### Example Operations

#### Get Domain List

Fetch a list of domains associated with your account.

```javascript
const domains = await client.domainsGetList({
listType: DomainsGetListType.ALL,
searchTerm: 'example',
page: 1,
pageSize: 20,
sortBy: DomainsGetListSortBy.NAME,
});
```

#### Create Domain

Register a new domain.

```javascript
const response = await client.createDomain({
domainName: 'example.com',
years: 1,
registrantFirstName: 'John',
registrantLastName: 'Doe',
registrantAddress1: '123 Main St',
registrantCity: 'Los Angeles',
registrantStateProvince: 'CA',
registrantPostalCode: '90001',
registrantCountry: 'US',
registrantPhone: '+11234567890',
registrantEmailAddress: 'john.doe@example.com',
});
```

#### Check Domain Availability

Check if a domain is available for registration.

```javascript
const availability = await client.checkDomainAvailability({ domainList: ['example.com'] });
```

#### Get TLD List

Retrieve the list of top-level domains (TLDs) available for registration.

```javascript
const tldList = await client.getTldList();
```

#### Manage DNS

You can manage DNS settings for your domains, including getting and setting DNS records.

```javascript
const dnsList = await client.getDnsList({ domainName: 'example.com' });
await client.setDefaultDns({ domainName: 'example.com' });
await client.setCustomDns({
domainName: 'example.com',
nameservers: ['ns1.example.com', 'ns2.example.com']
});
```

#### Email Forwarding

Manage email forwarding for your domains.

```javascript
await client.setDnsEmailForwarding({
domainName: 'example.com',
forwardToList: ['info@example.com'],
mailBoxList: ['mailbox@example.com'],
});
```

### Error Handling

The library throws `NamecheapError` for invalid operations or parameters. Catch these errors to handle them gracefully.

```javascript
try {
const result = await client.createDomain({ /* parameters */ });
} catch (error) {
if (error instanceof NamecheapError) {
console.error('Namecheap API error:', error.message);
}
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing

If you'd like to contribute to this project, please open an issue or submit a pull request.

## Acknowledgements

This library is built upon the Namecheap API. Refer to the [Namecheap API Documentation](https://www.namecheap.com/support/api/) for more detailed information about available endpoints and usage.