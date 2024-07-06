import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './interfaces/link.interface';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto): Link {
    return this.linkService.createLink(createLinkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Link {
    const link = this.linkService.getLink(id);

    if (!link) {
      throw new HttpException(
        'Link has already been used',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      generatedLink: link,
    };
  }
}
