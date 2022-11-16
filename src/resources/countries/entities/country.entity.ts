import { GenericEntities } from '../../../Generics/generic.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class CountryEntity extends GenericEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  flag: string;

  @Column('int')
  code: number;
}
