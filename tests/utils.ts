import { faker } from "@faker-js/faker";
import {
  DomainRegistrationRequest,
  DomainSetContactsRequest,
} from "../src/RequestType";

function generateFakePhone() {
  return `+1${faker.string.numeric(2)}.${faker.string.numeric(10)}`;
}

export function generateFakeDomainCreatePayload(
  domainName: string,
): DomainRegistrationRequest {
  return {
    domainName: domainName,
    years: 1,
    registrantFirstName: faker.person.firstName(),
    registrantLastName: faker.person.lastName(),
    registrantAddress1: faker.location.streetAddress(),
    registrantCity: faker.location.city(),
    registrantStateProvince: faker.location.state({ abbreviated: true }),
    registrantPostalCode: faker.location.zipCode(),
    registrantCountry: "US",
    registrantPhone: generateFakePhone(),
    registrantEmailAddress: faker.internet.email(),
    techFirstName: faker.person.firstName(),
    adminAddress1: faker.location.streetAddress(),
    adminCity: faker.location.city(),
    adminCountry: "US",
    adminEmailAddress: faker.internet.email(),
    adminFirstName: faker.person.firstName(),
    adminLastName: faker.person.lastName(),
    adminPhone: generateFakePhone(),
    adminPostalCode: faker.location.zipCode(),
    adminStateProvince: faker.location.state({ abbreviated: true }),
    auxBillingAddress1: faker.location.streetAddress(),
    auxBillingCity: faker.location.city(),
    auxBillingCountry: "US",
    auxBillingEmailAddress: faker.internet.email(),
    auxBillingFirstName: faker.person.firstName(),
    auxBillingLastName: faker.person.lastName(),
    auxBillingPhone: generateFakePhone(),
    auxBillingPostalCode: faker.location.zipCode(),
    auxBillingStateProvince: faker.location.state({ abbreviated: true }),
    techAddress1: faker.location.streetAddress(),
    techCity: faker.location.city(),
    techCountry: "US",
    techEmailAddress: faker.internet.email(),
    techLastName: faker.person.lastName(),
    techPhone: generateFakePhone(),
    techPostalCode: faker.location.zipCode(),
    techStateProvince: faker.location.state({ abbreviated: true }),
  };
}

export function generateFakeSetContactsPayload(
  domainName: string,
): DomainSetContactsRequest {
  return {
    domainName,
    registrantFirstName: faker.person.firstName(),
    registrantLastName: faker.person.lastName(),
    registrantAddress1: faker.location.streetAddress(),
    registrantCity: faker.location.city(),
    registrantStateProvince: faker.location.state(),
    registrantPostalCode: faker.location.zipCode(),
    registrantCountry: "US",
    registrantPhone: generateFakePhone(),
    registrantEmailAddress: faker.internet.email(),
    techFirstName: faker.person.firstName(),
    techLastName: faker.person.lastName(),
    techAddress1: faker.location.streetAddress(),
    techCity: faker.location.city(),
    techStateProvince: faker.location.state(),
    techPostalCode: faker.location.zipCode(),
    techCountry: "US",
    techPhone: generateFakePhone(),
    techEmailAddress: faker.internet.email(),
    adminFirstName: faker.person.firstName(),
    adminLastName: faker.person.lastName(),
    adminAddress1: faker.location.streetAddress(),
    adminCity: faker.location.city(),
    adminStateProvince: faker.location.state(),
    adminPostalCode: faker.location.zipCode(),
    adminCountry: "US",
    adminPhone: generateFakePhone(),
    adminEmailAddress: faker.internet.email(),
    auxBillingFirstName: faker.person.firstName(),
    auxBillingLastName: faker.person.lastName(),
    auxBillingAddress1: faker.location.streetAddress(),
    auxBillingCity: faker.location.city(),
    auxBillingStateProvince: faker.location.state(),
    auxBillingPostalCode: faker.location.zipCode(),
    auxBillingCountry: "US",
    auxBillingPhone: generateFakePhone(),
    auxBillingEmailAddress: faker.internet.email(),
  };
}

export function getRandomDomains(tlds: string[], domainNumber = 10) {
  return new Array(domainNumber)
    .fill(null)
    .map(
      () =>
        `${faker.internet.domainWord()}.${faker.helpers.arrayElement(tlds)}`,
    );
}
