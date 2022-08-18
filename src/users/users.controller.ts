import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  @Inject()
  usersService: UsersService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDTO) {
    const { limit, offset } = paginationQuery;
    return this.usersService.findAll(limit, offset);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
