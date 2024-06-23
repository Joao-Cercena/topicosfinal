import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
  } from '@nestjs/common';
  import { RegistroService } from './registro.service';
  import { RegistroDto } from './registro.dto';
  
  @Controller('registro')
  export class RegistroController {
    constructor(private registroService: RegistroService) {}
  
    @Get()
    async findAll(
      @Query('page') page: number,
      @Query('limit') limit: number,
    ) {
      return this.registroService.findAll(page, limit);
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      return this.registroService.findById(id);
    }

    @Get('search')
    async search(@Query() query: any) {
    return this.registroService.search(query);
  }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.registroService.remove(id);
    }
  
    @Post()
    create(@Body() dto: RegistroDto) {
      return this.registroService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: RegistroDto) {
      return this.registroService.update({ id, ...dto });
    }
  }