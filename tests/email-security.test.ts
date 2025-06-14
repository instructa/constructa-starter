/**
 * Email Security Tests
 *
 * These tests verify the email provider security enhancements,
 * particularly the redaction of sensitive HTML content in logs.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock nodemailer before importing providers
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' }),
    })),
  },
  createTransport: vi.fn(() => ({
    sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' }),
  })),
}));

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
      const config = {
        host: 'smtp.example.com',
        port: 587,
        secure: true,
        auth: {
          user: 'smtp-user',
          pass: 'smtp-password',
        },
      };

      const provider = new SMTPProvider(config);

      // Verify the provider was created successfully
      expect(provider).toBeDefined();
      expect(provider.sendEmail).toBeDefined();
    });

    it('should handle minimal SMTP configuration', () => {
      // Minimal config without auth
      const config = {
        host: 'localhost',
        port: 25,
      };

      // Creating provider should not throw
      expect(() => new SMTPProvider(config)).not.toThrow();
    });
  });

  describe('Mailhog Provider Security', () => {
    it('should use appropriate configuration for development', async () => {
      // Mock console.log to capture output
      const consoleLogSpy = vi.spyOn(console, 'log');

      const provider = new MailhogProvider();

      await provider.sendEmail({
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>Test content with <a href="?token=secret">link</a></p>',
      });

      // Verify console log was called
      expect(consoleLogSpy).toHaveBeenCalledWith('Email sent to Mailhog: recipient@example.com');

      // Restore console.log
      consoleLogSpy.mockRestore();
    });
  });

  describe('General Email Security', () => {
    it('should enforce consistent security practices across providers', () => {
      // Test that all providers implement the same interface
      const providers = [
        new ConsoleProvider(),
        new SMTPProvider({ host: 'localhost', port: 25 }),
        new MailhogProvider(),
      ];

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
