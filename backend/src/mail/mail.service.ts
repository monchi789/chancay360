import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { join } from "path";
import * as fs from "node:fs";
import { SendEmailDto } from "./dto/send-email.dto";

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendMail(to: string, subject: string, email: SendEmailDto) {
        const templatePath = join(process.cwd(), 'src', 'mail', 'templates', 'mail.html');

        try {
            const htmlContent = await fs.promises.readFile(templatePath, 'utf8');

            if (!htmlContent.trim()) {
                new Error('Error reading email template');
            }

            const finalHtmlContent = htmlContent
                .replace('{{firstName}}', email.firstName)
                .replace('{{lastName}}', email.lastName)
                .replace('{{email}}', email.email)
                .replace('{{phoneNumber}}', email.phoneNumber)
                .replace('{{message}}', email.message);

            const mailOptions = {
                from: process.env.MAIL_USER,
                to,
                subject,
                html: finalHtmlContent,
                attachments: [
                    {
                        filename: 'logo.webp',
                        path: join(process.cwd(), 'src', 'mail', 'templates', 'logo.webp'),
                        cid: 'logo@chancay360.com',
                    }
                ],
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending mail:', error.message);
            throw new Error('Error sending email');
        }
    }

    async sendMailConfirmation(email: SendEmailDto) {
        const templatePath = join(
            process.cwd(),
            'src',
            'mail',
            'templates',
            'confirmation.html',
        );

        try {
            const htmlContent = await fs.promises.readFile(templatePath, 'utf-8');

            if (!htmlContent.trim()) {
                new Error('Error reading email template');
            }

            const finalHtmlContent = htmlContent
                .replace('{{firstName}}', email.firstName)
                .replace('{{message}}', email.message);

            const mailOptions = {
                from: process.env.MAIL_USER,
                to: email.email,
                subject: 'Email confirmation',
                html: finalHtmlContent,
                attachments: [
                    {
                        filename: 'logo.webp',
                        path: join(process.cwd(), 'src', 'mail', 'templates', 'logo.webp'),
                        cid: 'logo@chancay360.com',
                    }
                ],
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending confirmation email:', error.message);
            throw new Error('Error sending confirmation email');
        }
    }
}