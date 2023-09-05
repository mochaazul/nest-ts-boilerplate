import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserPayload } from './user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PageDto } from 'common/dto/page.dto';
import { User } from './user.entity';
import { PageOptionsDto } from 'common/dto/page-option.dto';
import { ApiPaginatedResponse } from 'common/decorator/pagination.decorator';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  @ApiPaginatedResponse(User)
  @UseInterceptors(ClassSerializerInterceptor) // TO CLEANUP RESPONSE BASED ON @EXCLUDE DECORATOR ON ENTITY
  getUsers(@Query() pageOptions: PageOptionsDto): Promise<PageDto<User>> {
    return this.service.findAll(pageOptions);
  }

  @Post()
  @ApiOperation({ operationId: 'createUsers' })
  async create(@Body() payload: CreateUserPayload) {
    const result = await this.service.create(payload);
    return result;
  }
}
