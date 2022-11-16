import { GenericEntities } from '../../../Generics/generic.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity extends GenericEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  code: string;
}
