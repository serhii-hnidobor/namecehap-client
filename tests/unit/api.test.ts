import { beforeAll, describe, expect, test } from "@jest/globals";
import { Client as NameCheapApi } from "../../src";
import { GetDomainTld } from "../../src/ResponseType";
import {
  generateFakeDomainCreatePayload,
  generateFakeSetContactsPayload,
  getRandomDomains,
} from "../utils";

function fail(error: any): never {
  console.error(error);
  throw new Error(error);
}

global.fail = fail;

describe("NameCheapTest", () => {
  let nameCheapApi: NameCheapApi;
  let availableDomainName: string | null = null;
  const tlds: string[] = [];

  beforeAll(async () => {
    nameCheapApi = new NameCheapApi({
      apiUser: process.env.API_USER as string,
      username: process.env.USERNAME as string,
      apiKey: process.env.API_KEY as string,
      clientIP: process.env.CLIENT_IP as string,
    });

    const tldSupportAllApiMethodFilter = ({
      isSupportsIDN,
      isApiRegisterable,
      isApiRenewable,
      isApiTransferable,
    }: GetDomainTld) =>
      isSupportsIDN && isApiTransferable && isApiRenewable && isApiRegisterable;

    const tldList = await nameCheapApi.getTldList();
    if (tldList && tldList.tlds) {
      tldList.tlds.tld
        .filter(tldSupportAllApiMethodFilter)
        .forEach(({ name }) => tlds.push(name));
    } else {
      fail("Failed to fetch TLD list");
    }

    const domainList = getRandomDomains(tlds, 20);
    const checkResult = await nameCheapApi.checkDomainAvailability({
      domainList,
    });

    if (checkResult && checkResult.domainCheckResult) {
      for (const { domain, available } of checkResult.domainCheckResult) {
        if (available) {
          availableDomainName = domain;
          break;
        }
      }
    } else {
      fail("Failed to check domain availability");
    }

    if (availableDomainName) {
      const payload = generateFakeDomainCreatePayload(
        availableDomainName as string,
      );
      const response = await nameCheapApi.createDomain(payload);
      if (!response) {
        fail("Failed to create domain");
      }
    } else {
      fail("No available domain found");
    }
  }, 90000);

  test("should get domain contacts", async () => {
    try {
      if (availableDomainName) {
        const domainContacts = await nameCheapApi.getContacts(
          availableDomainName as string,
        );
        expect(domainContacts).toBeTruthy();
        console.log(JSON.stringify(domainContacts));
      } else {
        fail("No available domain name for testing");
      }
    } catch (error) {
      fail(error);
    }
  });

  test("should return list of domain", async () => {
    try {
      const response = await nameCheapApi.domainsGetList({});
      expect(response).toBeTruthy();
      expect(response).toHaveProperty("paging");
      expect(response).toHaveProperty("domainGetListResult");
      expect(response.type).toBe("namecheap.domains.getList");
    } catch (error) {
      fail(error);
    }
  });

  test("should check domain", async () => {
    try {
      const response = await nameCheapApi.check({ domainList: "google.com" });
      expect(response).toBeTruthy();
      expect(response.domainCheckResult).toHaveProperty("available");
    } catch (error) {
      fail(error);
    }
  });

  test("should set contacts", async () => {
    try {
      const payload = generateFakeSetContactsPayload(
        availableDomainName as string,
      );
      const response = await nameCheapApi.setContacts(payload);

      expect(response).toBeTruthy();
      expect(response.domainSetContactResult.isSuccess).toBe(true);
      expect(response.domainSetContactResult.domain).toBe(availableDomainName);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should get domain info", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const response = await nameCheapApi.getInfo({
        domainName: availableDomainName,
      });

      expect(response).toBeTruthy();
      console.log(response);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should get registrar lock", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const response = await nameCheapApi.getRegistrarLock({
        domainName: availableDomainName,
      });

      expect(response).toBeTruthy();
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should set registrar lock", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const { domain, isSuccess } = await nameCheapApi.setRegistrarLock({
        domainName: availableDomainName,
        lockAction: "LOCK",
      });

      expect(isSuccess).toBe(true);
      expect(domain).toBe(availableDomainName);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should set custom dns", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const nameservers = ["leia.ns.cloudflare.com", "woz.ns.cloudflare.com"];

      const { domain, updated } = await nameCheapApi.setCustomDns({
        domainName: availableDomainName,
        nameservers,
      });

      expect(updated).toBe(true);
      expect(domain).toBe(availableDomainName);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should get dns list", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const { domain, isUsingOurDNS, nameserver } =
        await nameCheapApi.getDnsList({ domainName: availableDomainName });

      expect(isUsingOurDNS).toBe(false);
      expect(domain).toBe(availableDomainName);
      expect(nameserver).toStrictEqual([
        "leia.ns.cloudflare.com",
        "woz.ns.cloudflare.com",
      ]);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should set default dns", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const { domain, updated } = await nameCheapApi.setDefaultDns({
        domainName: availableDomainName,
      });

      expect(updated).toBe(true);
      expect(domain).toBe(availableDomainName);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should get dns hosts", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const { domain, isUsingOurDNS, host } = await nameCheapApi.getDnsHosts({
        domainName: availableDomainName,
      });

      console.log(host, "host");

      expect(isUsingOurDNS).toBe(true);
      expect(domain).toBe(availableDomainName);
      expect(Array.isArray(host)).toBe(true);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should set dns email forwarding", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const res = await nameCheapApi.setDnsEmailForwarding({
        domainName: availableDomainName,
        forwardToList: ["13412423dsad@gmail.com"],
        mailBoxList: ["13412423dsad@namecheap.com"],
      });

      console.log(res, "eeeee");

      expect(res.domain).toBe(availableDomainName);
      expect(res.isSuccess).toBe(true);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should get dns email forwarding", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const res = await nameCheapApi.getDnsEmailForwarding({
        domainName: availableDomainName,
      });

      console.log(res, "yyyyyyyyy");

      expect(res.domain).toBe(availableDomainName);
      expect(Array.isArray(res.forward)).toBe(true);
    } catch (error) {
      fail(error);
    }
  }, 30000);

  test("should create ns", async () => {
    try {
      if (!availableDomainName) {
        fail(new Error("no available domain name"));
      }

      const nsIp = "216.239.32.10";
      const ns = "ns1.google.com";

      const { domain, ip, nameserver, isSuccess } = await nameCheapApi.createNs(
        {
          domainName: availableDomainName,
          nameserver: ns,
          ip: nsIp,
        },
      );

      expect(isSuccess).toBe(true);
      expect(domain).toBe(availableDomainName);
      expect(nameserver).toBe(ns);
      expect(ip).toBe(nsIp);
    } catch (error) {
      fail(error);
    }
  }, 30000);
});
