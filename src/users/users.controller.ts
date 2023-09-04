import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserPayload } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getUsers() {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() payload: CreateUserPayload) {
    const result = await this.service.create(payload);
    return result;
  }
}
