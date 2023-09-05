import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ResponseDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T | T[];

  @ApiProperty()
  stat_msg: string;

  @ApiProperty()
  stat_code: number;

  constructor(data: T | T[], stat_msg: string, stat_code: number) {
    this.data = data;
    this.stat_code = stat_code;
    this.stat_msg = stat_msg;
  }
}
