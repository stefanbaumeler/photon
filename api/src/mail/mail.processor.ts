import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { TMail } from '../types/mail'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

@Processor('mail')
export class MailProcessor {
    private transporter

    constructor (private config: ConfigService) {
        this.transporter = nodemailer.createTransport(
            {
                host: config.get('MAIL_HOST'),
                port: parseInt(config.get('MAIL_PORT') ?? ''),
                auth: {
                    user: config.get('MAIL_USER'),
                    pass: config.get('MAIL_PASSWORD')
                }
            } as SMTPTransport.Options,
            {
                from: {
                    name: 'Photon',
                    address: 'stefan@photon.com'
                }
            } as SMTPTransport.Options
        )
    }

    @Process('signup')
    async sendSignUpMail (job: Job<TMail>) {
        const { data } = job

        await this.transporter.sendMail(data)
    }
}
