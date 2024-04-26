import {
  getCookieDomain,
  getHostnameFromOrigin,
  getTLDFromHostname,
} from './cookies';
import { describe, expect, test } from 'vitest';
const appLocalhostOrigin = 'http://app.localhost:3000';
const localhostOrigin = 'http://localhost:3000';
const example = 'https://www.example.com';

describe('testing utils', () => {
  describe(appLocalhostOrigin, () => {
    test('getTLDFromHostname', () => {
      const hostname = getHostnameFromOrigin(appLocalhostOrigin);
      const tld = getTLDFromHostname(hostname);

      expect(tld).toBe('localhost');
    });

    test('getHostnameFromOrigin', () => {
      const hostname = getHostnameFromOrigin(appLocalhostOrigin);

      expect(hostname).toBe('app.localhost');
    });

    test(`getCookieDomain`, () => {
      const domain = getCookieDomain(appLocalhostOrigin, true);

      expect(domain).toBe('.localhost');
    });
  });

  describe(localhostOrigin, () => {
    test('getTLDFromHostname', () => {
      const hostname = getHostnameFromOrigin(localhostOrigin);
      const tld = getTLDFromHostname(hostname);

      expect(tld).toBe('localhost');
    });

    test('getHostnameFromOrigin', () => {
      const hostname = getHostnameFromOrigin(localhostOrigin);

      expect(hostname).toBe('localhost');
    });

    test(`getCookieDomain`, () => {
      const domain = getCookieDomain(localhostOrigin, true);

      expect(domain).toBe('.localhost');
    });
  });

  describe(example, () => {
    test('getTLDFromHostname', () => {
      const hostname = getHostnameFromOrigin(example);
      const tld = getTLDFromHostname(hostname);

      expect(tld).toBe('example.com');
    });

    test('getHostnameFromOrigin', () => {
      const hostname = getHostnameFromOrigin(example);

      expect(hostname).toBe('www.example.com');
    });

    test(`getCookieDomain`, () => {
      const domain = getCookieDomain(example, true);

      expect(domain).toBe('.example.com');
    });
  });

  describe('www.nextjskit.com', () => {
    test('');
  });
});
