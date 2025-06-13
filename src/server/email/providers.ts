import * as nodemailer from "nodemailer";
import { Resend } from "resend";

export interface EmailProvider {
	sendEmail(params: {
		from: string;
		to: string;
		subject: string;
		html: string;
	}): Promise<void>;
}

export class ResendProvider implements EmailProvider {
	private resend: Resend;

	constructor(apiKey: string) {
		this.resend = new Resend(apiKey);
	}

	async sendEmail({
		from,
		to,
		subject,
		html,
	}: {
		from: string;
		to: string;
		subject: string;
		html: string;
	}) {
		await this.resend.emails.send({
			from,
			to,
			subject,
			html,
		});
		console.log(`Email sent via Resend to: ${to}`);
	}
}

export class SMTPProvider implements EmailProvider {
	private transporter: nodemailer.Transporter;

	constructor(config: {
		host: string;
		port: number;
		secure?: boolean;
		auth?: {
			user: string;
			pass: string;
		};
	}) {
		this.transporter = nodemailer.createTransport(config);
	}

	async sendEmail({
		from,
		to,
		subject,
		html,
	}: {
		from: string;
		to: string;
		subject: string;
		html: string;
	}) {
		await this.transporter.sendMail({
			from,
			to,
			subject,
			html,
		});
		console.log(`Email sent via SMTP to: ${to}`);
	}
}

export class ConsoleProvider implements EmailProvider {
	async sendEmail({
		from,
		to,
		subject,
		html,
	}: {
		from: string;
		to: string;
		subject: string;
		html: string;
	}) {
		console.log("=== EMAIL (Console Provider) ===");
		console.log(`From: ${from}`);
		console.log(`To: ${to}`);
		console.log(`Subject: ${subject}`);
		console.log(`HTML: ${html}`);
		console.log("================================");
	}
}

export class MailhogProvider implements EmailProvider {
	private transporter: nodemailer.Transporter;

	constructor(host = "localhost", port = 1025) {
		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure: false,
			ignoreTLS: true,
		});
	}

	async sendEmail({
		from,
		to,
		subject,
		html,
	}: {
		from: string;
		to: string;
		subject: string;
		html: string;
	}) {
		await this.transporter.sendMail({
			from,
			to,
			subject,
			html,
		});
		console.log(`Email sent to Mailhog: ${to}`);
	}
}
