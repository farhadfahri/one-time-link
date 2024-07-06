import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { v4 as uuidv4 } from 'uuid';
import { Link } from './interfaces/link.interface';
import { LinkStorage } from './interfaces/link-storage.interface';
import { ConfigService } from '@nestjs/config';
import { APP_URL } from './constants/config.application';

@Injectable()
export class LinkService {
  constructor(private configService: ConfigService) {}
  private linkStorage: LinkStorage = {};
  private appUrl = this.configService.get<string>(APP_URL);

  createLink(createLinkDto: CreateLinkDto): Link {
    const generatedUniqueId = uuidv4();
    console.log('dto in create', createLinkDto);
    this.linkStorage[generatedUniqueId] = createLinkDto.uniqueId;

    console.log('this storage', this.linkStorage);

    const generatedLink = `${this.appUrl}/link/${generatedUniqueId}`;

    return { generatedLink: generatedLink };
  }

  getLink(uniqueId: string): string | null {
    const uniqueIdExists = this.linkStorage[uniqueId];

    console.log('unique exist', uniqueIdExists);

    if (uniqueIdExists) {
      delete this.linkStorage[uniqueId];
      return uniqueId;
    }

    return null;
  }
}
