import {
  ClassSerializerInterceptor,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserPayload } from './user.dto';
import { hashPassword } from 'common/helper/hash';
import E_MSG from 'common/constant/ErrorMsg';
import { PageOptionsDto } from 'common/dto/page-option.dto';
import { PageDto } from 'common/dto/page.dto';
import { PageMetaDto } from 'common/dto/page-meta.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const user = await this.userRepository.find({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });
    const itemCount = user.length;
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(user, pageMeta);
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const user = new User();
    user.username = payload.username;
    user.password = hashPassword(payload.password);
    this.userRepository.save(user);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException(E_MSG.WrongUsernamePassword);

    return user;
  }
}
