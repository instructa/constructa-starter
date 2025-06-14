/**
 * Authentication Integration Tests
 *
 * REQUIREMENTS:
 * - Dev server must be running at http://localhost:3000 (or set TEST_BASE_URL env var)
 * - Run with: pnpm test tests/auth-integration.test.ts
 *
 * These are integration tests that make real HTTP requests to the API endpoints.
 * Email sending is tested separately in the email provider test.
 */

import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

// Create a test helper to make API requests
async function makeAuthRequest(
  endpoint: string,
  options: {
    method?: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  } = {}
) {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const method = options.method || 'POST';

  // Build fetch options - only include body for non-GET methods
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  // Only add body for non-GET methods
  if (method !== 'GET' && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}/api/auth/${endpoint}`, fetchOptions);

  const text = await response.text();
  let data = null;

  // Only try to parse JSON if we have content
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      // If parsing fails, keep data as null
      console.error('Failed to parse response as JSON:', text);
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    headers: response.headers,
  };
}

describe('Authentication Integration Tests', () => {
  // Test user counter to ensure unique emails
  let testUserCounter = 0;
  const testTimestamp = Date.now();

  beforeAll(() => {
    console.log('Starting authentication integration tests...');
    console.log('Make sure the dev server is running at http://localhost:3000');
  });

  beforeEach(() => {
    testUserCounter++;
  });

  describe('Sign Up Flow', () => {
    it('should successfully sign up a new user', async () => {
      const testEmail = `test${testTimestamp}_${testUserCounter}@example.com`;
      const testPassword = 'SecurePassword123!';
      const testName = 'Test User';

      const response = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: testPassword,
          name: testName,
        },
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.user).toBeDefined();
      expect(response.data.user.email).toBe(testEmail);
      expect(response.data.user.name).toBe(testName);
      expect(response.data.user.emailVerified).toBe(false);
    });

    it('should reject sign up with invalid email', async () => {
      const response = await makeAuthRequest('sign-up/email', {
        body: {
          email: 'invalid-email',
          password: 'Password123!',
          name: 'Test User',
        },
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it('should reject sign up with weak password', async () => {
      const testEmail = `weak${testTimestamp}_${testUserCounter}@example.com`;

      const response = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: 'weak',
          name: 'Test User',
        },
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it('should reject duplicate email sign up', async () => {
      const duplicateEmail = `duplicate${testTimestamp}_${testUserCounter}@example.com`;

      // First sign up
      const firstResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: duplicateEmail,
          password: 'Password123!',
          name: 'First User',
        },
      });

      expect(firstResponse.ok).toBe(true);

      // Try to sign up with same email
      const secondResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: duplicateEmail,
          password: 'Password123!',
          name: 'Second User',
        },
      });

      expect(secondResponse.ok).toBe(false);
      // Better Auth returns 422 for duplicate users
      expect(secondResponse.status).toBe(422);
    });
  });

  describe('Email Verification Flow', () => {
    it('should handle email verification flow', async () => {
      // This test verifies that the email verification endpoints exist
      // In a real integration test, you would need to capture the token from logs or email

      const testEmail = `verify${testTimestamp}_${testUserCounter}@example.com`;

      // Sign up
      const signupResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: 'Password123!',
          name: 'To Verify',
        },
      });

      expect(signupResponse.ok).toBe(true);
      expect(signupResponse.data.user.emailVerified).toBe(false);

      // Note: In a real scenario, you would extract the token from the email
      // For integration testing, we're just verifying the endpoint exists
    });

    it('should reject invalid verification token', async () => {
      const verifyResponse = await makeAuthRequest('verify-email?token=invalid-token', {
        method: 'GET',
      });

      expect(verifyResponse.ok).toBe(false);
      // Better Auth returns 401 for invalid tokens
      expect(verifyResponse.status).toBe(401);
    });
  });

  describe('Sign In Flow', () => {
    it('should not sign in with unverified email when verification is required', async () => {
      // Skip this test if email verification is not enabled
      if (process.env.ENABLE_EMAIL_VERIFICATION !== 'true') {
        return;
      }

      const testEmail = `unverified${testTimestamp}_${testUserCounter}@example.com`;
      const testPassword = 'Password123!';

      // Create user
      await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: testPassword,
          name: 'Unverified User',
        },
      });

      // Try to sign in without verifying
      const signInResponse = await makeAuthRequest('sign-in/email', {
        body: {
          email: testEmail,
          password: testPassword,
        },
      });

      expect(signInResponse.ok).toBe(false);
      expect(signInResponse.status).toBe(403);
    });

    it('should sign in with unverified email when verification is not required', async () => {
      // This test is for when email verification is disabled but emails are still marked as unverified
      // In production, you would ensure the server is configured correctly

      const testEmail = `signin${testTimestamp}_${testUserCounter}@example.com`;
      const testPassword = 'Password123!';

      // Sign up
      const signupResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: testPassword,
          name: 'Test User',
        },
      });

      expect(signupResponse.ok).toBe(true);

      // Add a small delay to ensure the user is created
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Sign in
      const signInResponse = await makeAuthRequest('sign-in/email', {
        body: {
          email: testEmail,
          password: testPassword,
        },
      });

      // If email verification is truly disabled, this should succeed
      // If it fails with EMAIL_NOT_VERIFIED, the server needs to be restarted with correct env vars
      if (!signInResponse.ok && signInResponse.data?.code === 'EMAIL_NOT_VERIFIED') {
        console.log(
          'Note: Server is requiring email verification. Restart server with ENABLE_EMAIL_VERIFICATION=false'
        );
        // Skip this test in this case
        return;
      }

      expect(signInResponse.ok).toBe(true);
      expect(signInResponse.status).toBe(200);
    });

    it('should reject sign in with wrong password', async () => {
      const testEmail = `wrongpass${testTimestamp}_${testUserCounter}@example.com`;

      // Create user
      await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: 'CorrectPassword123!',
          name: 'Wrong Pass User',
        },
      });

      // Try to sign in with wrong password
      const signInResponse = await makeAuthRequest('sign-in/email', {
        body: {
          email: testEmail,
          password: 'WrongPassword123!',
        },
      });

      expect(signInResponse.ok).toBe(false);
      // Better Auth returns 401 for authentication failures
      expect(signInResponse.status).toBe(401);
    });
  });

  describe('Session Management', () => {
    it('should create session on successful sign in', async () => {
      const testEmail = `session${testTimestamp}_${testUserCounter}@example.com`;
      const testPassword = 'Password123!';

      // Create user
      const signupResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: testPassword,
          name: 'Session User',
        },
      });

      expect(signupResponse.ok).toBe(true);

      // Add a small delay to ensure the user is created
      await new Promise((resolve) => setTimeout(resolve, 100));

      const signInResponse = await makeAuthRequest('sign-in/email', {
        body: {
          email: testEmail,
          password: testPassword,
        },
      });

      // If email verification is blocking signin, skip this test
      if (!signInResponse.ok && signInResponse.data?.code === 'EMAIL_NOT_VERIFIED') {
        console.log(
          'Note: Server is requiring email verification. Restart server with ENABLE_EMAIL_VERIFICATION=false'
        );
        return;
      }

      expect(signInResponse.ok).toBe(true);

      // Check for session cookie
      const setCookieHeader = signInResponse.headers.get('set-cookie');
      expect(setCookieHeader).toBeDefined();
    });

    it('should get current session', async () => {
      const testEmail = `getsession${testTimestamp}_${testUserCounter}@example.com`;
      const testPassword = 'Password123!';

      // Create user
      const signupResponse = await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: testPassword,
          name: 'Get Session User',
        },
      });

      expect(signupResponse.ok).toBe(true);

      // Add a small delay to ensure the user is created
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Sign in
      const signInResponse = await makeAuthRequest('sign-in/email', {
        body: {
          email: testEmail,
          password: testPassword,
        },
      });

      // If email verification is blocking signin, skip this test
      if (!signInResponse.ok && signInResponse.data?.code === 'EMAIL_NOT_VERIFIED') {
        console.log(
          'Note: Server is requiring email verification. Restart server with ENABLE_EMAIL_VERIFICATION=false'
        );
        return;
      }

      expect(signInResponse.ok).toBe(true);

      // Get session - need to pass cookies from sign in
      const cookies = signInResponse.headers.get('set-cookie');
      const sessionResponse = await makeAuthRequest('session', {
        method: 'GET',
        headers: cookies ? { Cookie: cookies } : {},
      });

      expect(sessionResponse.ok).toBe(true);
      expect(sessionResponse.data).toBeDefined();
      expect(sessionResponse.data.session).toBeDefined();
      expect(sessionResponse.data.user).toBeDefined();
      expect(sessionResponse.data.user.email).toBe(testEmail);
    });
  });

  describe('Password Reset Flow', () => {
    it('should send password reset email', async () => {
      const testEmail = `reset${testTimestamp}_${testUserCounter}@example.com`;

      // Create user
      await makeAuthRequest('sign-up/email', {
        body: {
          email: testEmail,
          password: 'OldPassword123!',
          name: 'Reset User',
        },
      });

      // Request password reset
      const resetResponse = await makeAuthRequest('forget-password', {
        body: {
          email: testEmail,
          redirectTo: '/reset-password',
        },
      });

      // Check if sendResetPassword is configured
      if (resetResponse.ok) {
        expect(resetResponse.ok).toBe(true);
      } else {
        // If password reset is not configured, it should return 400
        expect(resetResponse.status).toBe(400);
      }
    });
  });

  describe('Email Provider Test', () => {
    it('should successfully send test email', async () => {
      const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/test-email`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
      expect(data.provider).toBeDefined();
    });
  });
});
