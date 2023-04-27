import { Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';


@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }
  
  @Get()
  async findAll() {
    try {
      await this.catsService.findAll()
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  async findTudo() {
    throw new ForbiddenException();
  }

}