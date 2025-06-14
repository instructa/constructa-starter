import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { sendEmail } from "~/server/email";

// Mock the email sending
vi.mock("~/server/email", () => ({
	sendEmail: vi.fn().mockResolvedValue(undefined),
}));

// Create a test helper to make API requests
async function makeAuthRequest(
	endpoint: string,
	options: {
		method?: string;
		body?: Record<string, unknown>;
		headers?: Record<string, string>;
	} = {},
) {
	const baseUrl = "http://localhost:3000";
	const response = await fetch(`${baseUrl}/api/auth/${endpoint}`, {
		method: options.method || "POST",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		body: options.body ? JSON.stringify(options.body) : undefined,
		credentials: "include",
	});

	const data = await response.text();

	return {
		ok: response.ok,
		status: response.status,
		data: data ? JSON.parse(data) : null,
		headers: response.headers,
	};
}

describe("Authentication Integration Tests", () => {
	// Store captured emails
	let capturedEmails: Array<{
		to: string;
		subject: string;
		html: string;
		from?: string;
	}> = [];

	// Test user counter to ensure unique emails
	let testUserCounter = 0;

	beforeAll(() => {
		console.log("Starting authentication integration tests...");
		console.log("Make sure the dev server is running at http://localhost:3000");
	});

	beforeEach(() => {
		// Clear captured emails before each test
		capturedEmails = [];
		testUserCounter++;

		// Capture emails instead of sending them
		vi.mocked(sendEmail).mockImplementation(async (params) => {
			capturedEmails.push(params);
			console.log(`[TEST] Email captured: ${params.subject} to ${params.to}`);
		});
	});

	describe("Sign Up Flow", () => {
		it("should successfully sign up a new user", async () => {
			const testEmail = `test${testUserCounter}@example.com`;
			const testPassword = "SecurePassword123!";
			const testName = "Test User";

			const response = await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: testPassword,
					name: testName,
				},
			});

			expect(response.ok).toBe(true);
			expect(response.status).toBe(200);
			expect(response.data).toBeDefined();

			// Check if verification email was captured
			expect(capturedEmails.length).toBe(1);
			expect(capturedEmails[0].to).toBe(testEmail);
			expect(capturedEmails[0].subject).toBe("Verify your email address");
		});

		it("should reject sign up with invalid email", async () => {
			const response = await makeAuthRequest("sign-up/email", {
				body: {
					email: "invalid-email",
					password: "Password123!",
					name: "Test User",
				},
			});

			expect(response.ok).toBe(false);
			expect(response.status).toBe(400);
		});

		it("should reject sign up with weak password", async () => {
			const testEmail = `weak${testUserCounter}@example.com`;

			const response = await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: "weak",
					name: "Test User",
				},
			});

			expect(response.ok).toBe(false);
			expect(response.status).toBe(400);
		});

		it("should reject duplicate email sign up", async () => {
			const duplicateEmail = `duplicate${testUserCounter}@example.com`;

			// First sign up
			const firstResponse = await makeAuthRequest("sign-up/email", {
				body: {
					email: duplicateEmail,
					password: "Password123!",
					name: "First User",
				},
			});

			expect(firstResponse.ok).toBe(true);

			// Try to sign up with same email
			const secondResponse = await makeAuthRequest("sign-up/email", {
				body: {
					email: duplicateEmail,
					password: "Password123!",
					name: "Second User",
				},
			});

			expect(secondResponse.ok).toBe(false);
			expect(secondResponse.status).toBe(400);
		});
	});

	describe("Email Verification Flow", () => {
		it("should verify email with valid token", async () => {
			const testEmail = `verify${testUserCounter}@example.com`;
			capturedEmails = [];

			// Sign up
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: "Password123!",
					name: "To Verify",
				},
			});

			// Extract verification URL from captured email
			expect(capturedEmails.length).toBe(1);
			const verificationEmail = capturedEmails[0];
			const urlMatch = verificationEmail.html.match(/href="([^"]+)"/);

			expect(urlMatch).toBeDefined();
			if (!urlMatch) throw new Error("No URL found in email");

			const verificationUrl = urlMatch[1];
			const url = new URL(verificationUrl);
			const token = url.searchParams.get("token");

			expect(token).toBeDefined();
			if (!token) throw new Error("No token found in URL");

			// Verify email
			const verifyResponse = await makeAuthRequest(
				`verify-email?token=${token}`,
				{
					method: "GET",
				},
			);

			expect(verifyResponse.ok).toBe(true);
			expect(verifyResponse.status).toBe(200);
		});

		it("should reject invalid verification token", async () => {
			const verifyResponse = await makeAuthRequest(
				"verify-email?token=invalid-token",
				{
					method: "GET",
				},
			);

			expect(verifyResponse.ok).toBe(false);
			expect(verifyResponse.status).toBe(400);
		});
	});

	describe("Sign In Flow", () => {
		it("should not sign in with unverified email when verification is required", async () => {
			const testEmail = `unverified${testUserCounter}@example.com`;
			const testPassword = "Password123!";

			// Create user
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: testPassword,
					name: "Unverified User",
				},
			});

			// Try to sign in without verifying
			const signInResponse = await makeAuthRequest("sign-in/email", {
				body: {
					email: testEmail,
					password: testPassword,
				},
			});

			expect(signInResponse.ok).toBe(false);
			expect(signInResponse.status).toBe(400);
		});

		it("should sign in after email verification", async () => {
			const testEmail = `verified${testUserCounter}@example.com`;
			const testPassword = "Password123!";
			capturedEmails = [];

			// Sign up
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: testPassword,
					name: "Verified User",
				},
			});

			// Verify email
			const verificationEmail = capturedEmails[0];
			const urlMatch = verificationEmail.html.match(/href="([^"]+)"/);
			if (!urlMatch) throw new Error("No URL found");

			const url = new URL(urlMatch[1]);
			const token = url.searchParams.get("token");
			if (!token) throw new Error("No token found");

			await makeAuthRequest(`verify-email?token=${token}`, {
				method: "GET",
			});

			// Now sign in
			const signInResponse = await makeAuthRequest("sign-in/email", {
				body: {
					email: testEmail,
					password: testPassword,
				},
			});

			expect(signInResponse.ok).toBe(true);
			expect(signInResponse.status).toBe(200);
		});

		it("should reject sign in with wrong password", async () => {
			const testEmail = `wrongpass${testUserCounter}@example.com`;
			capturedEmails = [];

			// Create and verify user
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: "CorrectPassword123!",
					name: "Wrong Pass User",
				},
			});

			// Verify email
			const verificationEmail = capturedEmails[0];
			const urlMatch = verificationEmail.html.match(/href="([^"]+)"/);
			if (!urlMatch) throw new Error("No URL found");

			const url = new URL(urlMatch[1]);
			const token = url.searchParams.get("token");
			if (!token) throw new Error("No token found");

			await makeAuthRequest(`verify-email?token=${token}`, {
				method: "GET",
			});

			// Try to sign in with wrong password
			const signInResponse = await makeAuthRequest("sign-in/email", {
				body: {
					email: testEmail,
					password: "WrongPassword123!",
				},
			});

			expect(signInResponse.ok).toBe(false);
			expect(signInResponse.status).toBe(400);
		});
	});

	describe("Session Management", () => {
		it("should create session on successful sign in", async () => {
			const testEmail = `session${testUserCounter}@example.com`;
			const testPassword = "Password123!";
			capturedEmails = [];

			// Create, verify and sign in
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: testPassword,
					name: "Session User",
				},
			});

			// Verify email
			const verificationEmail = capturedEmails[0];
			const urlMatch = verificationEmail.html.match(/href="([^"]+)"/);
			if (!urlMatch) throw new Error("No URL found");

			const url = new URL(urlMatch[1]);
			const token = url.searchParams.get("token");
			if (!token) throw new Error("No token found");

			await makeAuthRequest(`verify-email?token=${token}`, {
				method: "GET",
			});

			// Sign in
			const signInResponse = await makeAuthRequest("sign-in/email", {
				body: {
					email: testEmail,
					password: testPassword,
				},
			});

			expect(signInResponse.ok).toBe(true);

			// Check for session cookie
			const setCookieHeader = signInResponse.headers.get("set-cookie");
			expect(setCookieHeader).toBeDefined();
		});

		it("should get current session", async () => {
			const testEmail = `getsession${testUserCounter}@example.com`;
			const testPassword = "Password123!";
			capturedEmails = [];

			// Create, verify and sign in
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: testPassword,
					name: "Get Session User",
				},
			});

			// Verify email
			const verificationEmail = capturedEmails[0];
			const urlMatch = verificationEmail.html.match(/href="([^"]+)"/);
			if (!urlMatch) throw new Error("No URL found");

			const url = new URL(urlMatch[1]);
			const token = url.searchParams.get("token");
			if (!token) throw new Error("No token found");

			await makeAuthRequest(`verify-email?token=${token}`, {
				method: "GET",
			});

			// Sign in
			await makeAuthRequest("sign-in/email", {
				body: {
					email: testEmail,
					password: testPassword,
				},
			});

			// Get session
			const sessionResponse = await makeAuthRequest("session", {
				method: "GET",
			});

			expect(sessionResponse.ok).toBe(true);
			expect(sessionResponse.data).toBeDefined();
			expect(sessionResponse.data.user).toBeDefined();
			expect(sessionResponse.data.user.email).toBe(testEmail);
		});
	});

	describe("Password Reset Flow", () => {
		it("should send password reset email", async () => {
			const testEmail = `reset${testUserCounter}@example.com`;
			capturedEmails = [];

			// Create user
			await makeAuthRequest("sign-up/email", {
				body: {
					email: testEmail,
					password: "OldPassword123!",
					name: "Reset User",
				},
			});

			// Clear emails from sign up
			capturedEmails = [];

			// Request password reset
			const resetResponse = await makeAuthRequest("forgot-password", {
				body: {
					email: testEmail,
				},
			});

			expect(resetResponse.ok).toBe(true);

			// Check reset email was captured
			expect(capturedEmails.length).toBeGreaterThan(0);
			const resetEmail = capturedEmails.find(
				(e) =>
					e.subject.toLowerCase().includes("reset") ||
					e.subject.toLowerCase().includes("password"),
			);
			expect(resetEmail).toBeDefined();
			expect(resetEmail?.to).toBe(testEmail);
		});
	});

	describe("Email Provider Test", () => {
		it("should successfully send test email", async () => {
			capturedEmails = [];

			const response = await fetch("http://localhost:3000/api/test-email");
			const data = await response.json();

			expect(response.ok).toBe(true);
			expect(data.success).toBe(true);
			expect(data.provider).toBeDefined();

			// Check if email was captured
			expect(capturedEmails.length).toBe(1);
			expect(capturedEmails[0].to).toBe("test@example.com");
			expect(capturedEmails[0].subject).toBe("Test Email");
		});
	});
});
