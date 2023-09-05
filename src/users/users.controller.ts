import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserPayload } from './user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  getUsers() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ operationId: 'createUsers' })
  async create(@Body() payload: CreateUserPayload) {
    const result = await this.service.create(payload);
    return result;
  }
}
