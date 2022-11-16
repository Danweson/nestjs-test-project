import { PartialType } from '@nestjs/mapped-types';
import { CreateCompagnyDto } from './create-compagny.dto';

export class UpdateCompagnyDto extends PartialType(CreateCompagnyDto) {}
