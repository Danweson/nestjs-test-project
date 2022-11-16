import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompagniesService } from './compagnies.service';
import { CreateCompagnyDto } from './dto/create-compagny.dto';
import { UpdateCompagnyDto } from './dto/update-compagny.dto';

@Controller('compagnies')
export class CompagniesController {
  constructor(private readonly compagniesService: CompagniesService) {}

  @Post()
  create(@Body() createCompagnyDto: CreateCompagnyDto) {
    return this.compagniesService.create(createCompagnyDto);
  }

  @Get()
  findAll() {
    return this.compagniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compagniesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompagnyDto: UpdateCompagnyDto,
  ) {
    return this.compagniesService.update(+id, updateCompagnyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compagniesService.remove(+id);
  }
}
