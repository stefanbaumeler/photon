import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class MailService {
    private readonly signupTemplate: handlebars.TemplateDelegate
    private readonly resetPasswordTemplate: handlebars.TemplateDelegate

    constructor (@InjectQueue('mail') private readonly emailQueue: Queue, private readonly i18n: I18nService) {
        this.signupTemplate = this.loadTemplate('templates/signup.hbs')
        this.resetPasswordTemplate = this.loadTemplate('templates/reset-password.hbs')

        handlebars.registerPartial({
            header: this.loadTemplate('partials/header.hbs'),
            footer: this.loadTemplate('partials/footer.hbs'),
            head: this.loadTemplate('partials/head.hbs')
        })
    }

    private loadTemplate (templateName: string): handlebars.TemplateDelegate {
        const templatesFolderPath = path.join(__dirname, '../../../src/mail/')
        const templatePath = path.join(templatesFolderPath, templateName)

        const templateSource = fs.readFileSync(templatePath, 'utf8')

        handlebars.registerHelper('t', (str) => {
            const translated = this.i18n.t(`mail.${str}`)
            const escaped = handlebars.Utils.escapeExpression(translated)
            const text = escaped.replace(/(\r\n|\n|\r)/gm, '<br />')
            return new handlebars.SafeString(text)
        })

        return handlebars.compile(templateSource)
    }

    async sendSignUpMail (data: { to: string, token: string }) {
        const job = await this.emailQueue.add('signup', {
            ...data,
            subject: this.i18n.t('mail.SIGNUP_SUBJECT'),
            html: this.signupTemplate(data)
        })

        return {
            jobId: job.id
        }
    }

    async sendResetPasswordMail (data: { to: string }) {
        const job = await this.emailQueue.add('signup', {
            ...data,
            subject: this.i18n.t('mail.RESET_PASSWORD_SUBJECT'),
            html: this.resetPasswordTemplate({})
        })

        return {
            jobId: job.id
        }
    }
}
