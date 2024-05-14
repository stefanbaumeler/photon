import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'
import { TagRepository } from './tag.repository'

@Injectable()
export class TagService {
    constructor(private repository: TagRepository, private jwtService: JwtService, private config: ConfigService, private mail: MailService) { }
}
