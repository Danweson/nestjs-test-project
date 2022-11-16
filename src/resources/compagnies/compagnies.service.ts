import { Injectable } from '@nestjs/common';
import { CreateCompagnyDto } from './dto/create-compagny.dto';
import { UpdateCompagnyDto } from './dto/update-compagny.dto';

@Injectable()
export class CompagniesService {
  create(createCompagnyDto: CreateCompagnyDto) {
    return 'This action adds a new compagny';
  }

  findAll() {
    return `This action returns all compagnies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compagny`;
  }

  update(id: number, updateCompagnyDto: UpdateCompagnyDto) {
    return `This action updates a #${id} compagny`;
  }

  remove(id: number) {
    return `This action removes a #${id} compagny`;
  }
}
