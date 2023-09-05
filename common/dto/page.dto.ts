import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';
import { ResponseDto } from './response.dto';
import { IsArray } from 'class-validator';

export class PageDto<T> extends ResponseDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly pagination: PageMetaDto;

  constructor(
    data: T[],
    meta: PageMetaDto,
    msg: string = '',
    http_code: number = 200,
  ) {
    super(data, msg, http_code);
    this.pagination = meta;
  }
}
