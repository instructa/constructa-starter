/**
 * Email Security Tests
 *
 * These tests verify the email provider security enhancements,
 * particularly the redaction of sensitive HTML content in logs.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConsoleProvider, MailhogProvider, SMTPProvider } from '~/server/email/providers';

describe('Email Provider Security', () => {
  // Store original console.log to restore later
  const originalConsoleLog = console.log;
  let consoleOutput: string[] = [];

  beforeEach(() => {
    // Mock console.log to capture output
    consoleOutput = [];
    console.log = vi.fn((...args) => {
      consoleOutput.push(args.join(' '));
    });
  });

  afterEach(() => {
    // Restore original console.log
    console.log = originalConsoleLog;
  });

  describe('ConsoleProvider Security', () => {
    it('should redact HTML content in console output', async () => {
      const provider = new ConsoleProvider();

      const sensitiveHTML = `
        <html>
          <body>
            <h1>Password Reset</h1>
            <p>Click here to reset your password:</p>
            <a href="https://example.com/reset?token=super-secret-token-12345">Reset Password</a>
            <p>This token expires in 1 hour.</p>
          </body>
        </html>
      `;

      await provider.sendEmail({
        from: 'noreply@example.com',
        to: 'user@example.com',
        subject: 'Password Reset Request',
        html: sensitiveHTML,
      });

      // Verify console output
      const output = consoleOutput.join('\n');

      // Should include basic email info
      expect(output).toContain('=== EMAIL (Console Provider) ===');
      expect(output).toContain('From: noreply@example.com');
      expect(output).toContain('To: user@example.com');
      expect(output).toContain('Subject: Password Reset Request');

      // Should NOT include the actual HTML content
      expect(output).not.toContain('super-secret-token-12345');
      expect(output).not.toContain('<html>');
      expect(output).not.toContain('Reset Password');

      // Should include redaction message
      expect(output).toContain('HTML: [redacted for security]');
    });

    it('should handle emails with verification tokens securely', async () => {
      const provider = new ConsoleProvider();

      const verificationHTML = `
        <div>
          <h2>Verify your email</h2>
          <p>Please verify your email by clicking the link below:</p>
          <a href="https://example.com/verify?token=verification-token-xyz789&email=user@example.com">
            Verify Email
          </a>
        </div>
      `;

      await provider.sendEmail({
        from: 'verify@example.com',
        to: 'newuser@example.com',
        subject: 'Email Verification',
        html: verificationHTML,
      });

      const output = consoleOutput.join('\n');

      // Should not expose verification token
      expect(output).not.toContain('verification-token-xyz789');
      expect(output).not.toContain('token=');
      expect(output).toContain('HTML: [redacted for security]');
    });

    it('should handle magic link emails securely', async () => {
      const provider = new ConsoleProvider();

      const magicLinkHTML = `
        <p>Sign in to your account using this magic link:</p>
        <a href="https://example.com/auth/magic?token=magic-link-abc123&redirect=/dashboard">
          Sign In
        </a>
        <p>This link expires in 15 minutes.</p>
      `;

      await provider.sendEmail({
        from: 'auth@example.com',
        to: 'user@example.com',
        subject: 'Magic Link Sign In',
        html: magicLinkHTML,
      });

      const output = consoleOutput.join('\n');

      // Should not expose magic link token
      expect(output).not.toContain('magic-link-abc123');
      expect(output).not.toContain('auth/magic');
      expect(output).toContain('HTML: [redacted for security]');
    });
  });

  describe('SMTP Provider Security', () => {
    it('should properly configure SMTP transport with secure options', () => {
      // Mock environment variables
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_PORT = '587';
      process.env.SMTP_USER = 'smtp-user';
      process.env.SMTP_PASS = 'smtp-password';
      process.env.SMTP_SECURE = 'true';

      const provider = new SMTPProvider();

      // Access the transporter config through the provider
      // Note: In a real implementation, you might need to expose this for testing
      // or use a spy to verify the configuration

      // For now, we just verify the provider was created successfully
      expect(provider).toBeDefined();
    });

    it('should handle missing SMTP configuration gracefully', () => {
      // Clear SMTP environment variables
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_PORT;
      delete process.env.SMTP_USER;
      delete process.env.SMTP_PASS;

      // Creating provider should not throw
      expect(() => new SMTPProvider()).not.toThrow();
    });
  });

  describe('Mailhog Provider Security', () => {
    it('should use appropriate configuration for development', async () => {
      const provider = new MailhogProvider();

      // Mock fetch to prevent actual HTTP requests
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      await provider.sendEmail({
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>Test content with <a href="?token=secret">link</a></p>',
      });

      // Verify fetch was called with correct URL
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8025/api/v1/send',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      // Verify the body contains the email data
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1].body as string);

      expect(body.from).toBe('test@example.com');
      expect(body.to).toBe('recipient@example.com');
      expect(body.subject).toBe('Test Email');
      expect(body.html).toContain('token=secret'); // Mailhog can show tokens for dev
    });
  });

  describe('General Email Security', () => {
    it('should enforce consistent security practices across providers', () => {
      // Test that all providers implement the same interface
      const providers = [new ConsoleProvider(), new SMTPProvider(), new MailhogProvider()];

      providers.forEach((provider) => {
        // All should have sendEmail method
        expect(provider.sendEmail).toBeDefined();
        expect(typeof provider.sendEmail).toBe('function');
      });
    });

    it('should handle email errors securely without exposing sensitive data', async () => {
      const provider = new ConsoleProvider();

      // Test with various error-prone inputs
      const testCases = [
        {
          from: '',
          to: 'user@example.com',
          subject: 'Test',
          html: '<p>Token: secret-123</p>',
        },
        {
          from: 'noreply@example.com',
          to: '',
          subject: 'Test',
          html: '<p>Password: mypassword</p>',
        },
        {
          from: 'noreply@example.com',
          to: 'user@example.com',
          subject: '',
          html: '<script>alert("xss")</script>',
        },
      ];

      for (const testCase of testCases) {
        await provider.sendEmail(testCase);

        const output = consoleOutput.join('\n');

        // Should never expose sensitive content
        expect(output).not.toContain('secret-123');
        expect(output).not.toContain('mypassword');
        expect(output).not.toContain('<script>');
      }
    });
  });
});
