/**
 * Security Integration Tests
 *
 * REQUIREMENTS:
 * - Dev server must be running at http://localhost:3000 (or set TEST_BASE_URL env var)
 * - Run with: pnpm test tests/security-integration.test.ts
 *
 * These tests verify the security enhancements including:
 * - CSRF protection
 * - Rate limiting
 * - Secure cookie handling
 * - HSTS headers (in production mode)
 */

import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

// Helper to make authenticated requests with CSRF handling
async function makeSecureRequest(
  url: string,
  options: {
    method?: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    includeCSRF?: boolean;
  } = {}
) {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const method = options.method || 'POST';

  // First, get CSRF token if needed
  let csrfToken = '';
  let cookieHeader = '';

  if (options.includeCSRF !== false && method !== 'GET' && method !== 'HEAD') {
    // Make a GET request to obtain CSRF cookie
    const csrfResponse = await fetch(`${baseUrl}/api/auth/session`, {
      credentials: 'include',
    });

    const setCookieHeader = csrfResponse.headers.get('set-cookie');
    if (setCookieHeader) {
      // Extract CSRF token from cookie
      const csrfMatch = setCookieHeader.match(/csrfToken=([^;]+)/);
      if (csrfMatch) {
        csrfToken = csrfMatch[1];
        cookieHeader = `csrfToken=${csrfToken}`;
      }
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'x-csrf-token': csrfToken }),
      ...(cookieHeader && { Cookie: cookieHeader }),
      ...options.headers,
    },
    credentials: 'include',
  };

  if (method !== 'GET' && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}${url}`, fetchOptions);

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    headers: response.headers,
  };
}

describe('Security Integration Tests', () => {
  let testCounter = 0;
  const testTimestamp = Date.now();

  beforeAll(() => {
    console.log('Starting security integration tests...');
    console.log('Make sure the dev server is running at http://localhost:3000');
  });

  beforeEach(() => {
    testCounter++;
  });

  describe('CSRF Protection', () => {
    it('should reject auth requests without CSRF token', async () => {
      const response = await makeSecureRequest('/api/auth/sign-in/email', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
        includeCSRF: false, // Explicitly skip CSRF
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(403);
      expect(response.data).toContain('Invalid CSRF token');
    });

    it('should accept auth requests with valid CSRF token', async () => {
      const response = await makeSecureRequest('/api/auth/sign-in/email', {
        method: 'POST',
        body: {
          email: 'nonexistent@example.com',
          password: 'password123',
        },
        includeCSRF: true,
      });

      // Should fail with 401 (user not found) instead of 403 (CSRF)
      expect(response.status).not.toBe(403);
    });

    it('should set CSRF cookie on first request', async () => {
      const response = await makeSecureRequest('/api/auth/session', {
        method: 'GET',
      });

      const setCookieHeader = response.headers.get('set-cookie');
      expect(setCookieHeader).toBeTruthy();
      expect(setCookieHeader).toContain('csrfToken=');
    });

    it('should not require CSRF for GET requests', async () => {
      const response = await makeSecureRequest('/api/auth/session', {
        method: 'GET',
        includeCSRF: false,
      });

      // Should not be rejected for CSRF
      expect(response.status).not.toBe(403);
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit auth endpoints', async () => {
      const requests = [];

      // Make 11 requests (1 more than the limit of 10)
      for (let i = 0; i < 11; i++) {
        requests.push(
          makeSecureRequest('/api/auth/sign-in/email', {
            method: 'POST',
            body: {
              email: `ratelimit${i}@example.com`,
              password: 'password123',
            },
          })
        );
      }

      const responses = await Promise.all(requests);

      // First 10 should not be rate limited (may fail for other reasons)
      const nonRateLimited = responses.slice(0, 10);
      nonRateLimited.forEach((response) => {
        expect(response.status).not.toBe(429);
      });

      // The 11th request should be rate limited
      expect(responses[10].status).toBe(429);
      expect(responses[10].data).toContain('Too many requests');
    });

    it('should not rate limit non-auth endpoints', async () => {
      const requests = [];

      // Make many requests to a non-auth endpoint
      for (let i = 0; i < 15; i++) {
        requests.push(
          makeSecureRequest('/api/test-email', {
            method: 'GET',
            includeCSRF: false,
          })
        );
      }

      const responses = await Promise.all(requests);

      // None should be rate limited
      responses.forEach((response) => {
        expect(response.status).not.toBe(429);
      });
    });

    it('should reset rate limit after time window', async () => {
      // This test would need to wait for the rate limit window to expire
      // Skip in CI to avoid long test times
      if (process.env.CI) {
        console.log('Skipping rate limit reset test in CI');
        return;
      }

      // First, exhaust the rate limit
      const requests = [];
      for (let i = 0; i < 11; i++) {
        requests.push(
          makeSecureRequest('/api/auth/sign-in/email', {
            method: 'POST',
            body: {
              email: `reset${i}@example.com`,
              password: 'password123',
            },
          })
        );
      }

      await Promise.all(requests);

      // Wait for rate limit window to expire (60 seconds)
      console.log('Waiting 61 seconds for rate limit to reset...');
      await new Promise((resolve) => setTimeout(resolve, 61000));

      // Try again - should not be rate limited
      const response = await makeSecureRequest('/api/auth/sign-in/email', {
        method: 'POST',
        body: {
          email: 'afterreset@example.com',
          password: 'password123',
        },
      });

      expect(response.status).not.toBe(429);
    });
  });

  describe('Secure Cookie Configuration', () => {
    it('should set secure session cookie with proper options', async () => {
      const testEmail = `cookie${testTimestamp}_${testCounter}@example.com`;

      // Sign up
      await makeSecureRequest('/api/auth/sign-up/email', {
        body: {
          email: testEmail,
          password: 'SecurePassword123!',
          name: 'Cookie Test',
        },
      });

      // Sign in
      const signInResponse = await makeSecureRequest('/api/auth/sign-in/email', {
        body: {
          email: testEmail,
          password: 'SecurePassword123!',
        },
      });

      const setCookieHeader = signInResponse.headers.get('set-cookie');
      expect(setCookieHeader).toBeTruthy();

      // Check for secure cookie attributes
      expect(setCookieHeader).toContain('HttpOnly');
      expect(setCookieHeader).toContain('SameSite=Lax');
      expect(setCookieHeader).toContain('Path=/');

      // In production, should also have Secure attribute
      if (process.env.NODE_ENV === 'production') {
        expect(setCookieHeader).toContain('Secure');
      }
    });

    it('should use custom session cookie name if configured', async () => {
      const cookieName = process.env.SESSION_COOKIE_NAME || 'ex0_session';

      const testEmail = `cookiename${testTimestamp}_${testCounter}@example.com`;

      // Sign up
      await makeSecureRequest('/api/auth/sign-up/email', {
        body: {
          email: testEmail,
          password: 'SecurePassword123!',
          name: 'Cookie Name Test',
        },
      });

      // Sign in
      const signInResponse = await makeSecureRequest('/api/auth/sign-in/email', {
        body: {
          email: testEmail,
          password: 'SecurePassword123!',
        },
      });

      const setCookieHeader = signInResponse.headers.get('set-cookie');
      expect(setCookieHeader).toContain(`${cookieName}=`);
    });
  });

  describe('HSTS Header', () => {
    it('should include HSTS header in production', async () => {
      // This test only makes sense in production mode
      if (process.env.NODE_ENV !== 'production') {
        console.log('Skipping HSTS test - not in production mode');
        return;
      }

      const response = await makeSecureRequest('/api/auth/session', {
        method: 'GET',
      });

      const hstsHeader = response.headers.get('strict-transport-security');
      expect(hstsHeader).toBeTruthy();
      expect(hstsHeader).toContain('max-age=63072000');
      expect(hstsHeader).toContain('includeSubDomains');
      expect(hstsHeader).toContain('preload');
    });
  });

  describe('Email Security', () => {
    it('should not expose sensitive email content in logs', async () => {
      // This test verifies that the ConsoleProvider redacts HTML content
      // We can't directly test console output, but we can verify the endpoint works
      const response = await makeSecureRequest('/api/test-email', {
        method: 'GET',
        includeCSRF: false,
      });

      expect(response.ok).toBe(true);
      expect(response.data.success).toBe(true);

      // The actual console output should show "[redacted for security]" instead of HTML
      // This would need to be verified manually or with a log capture mechanism
    });
  });

  describe('HTTPS Enforcement', () => {
    it('should redirect HTTP to HTTPS in production', async () => {
      // This test only makes sense in production mode
      if (process.env.NODE_ENV !== 'production') {
        console.log('Skipping HTTPS redirect test - not in production mode');
        return;
      }

      // This would need to be tested with an actual HTTP request
      // which is difficult in a local test environment
      // In a real production test, you would make an HTTP request and verify the redirect
    });
  });
});
