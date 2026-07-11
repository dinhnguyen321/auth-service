import { Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'no-store')
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('cat/*')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  // @Get('cat/:id')
  // findOne(@Param() params: any): string {
  // console.log(params.id);
  // return `This action returns a #${params.id} cat`;
  // }
}
