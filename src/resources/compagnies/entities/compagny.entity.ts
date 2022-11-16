import { GenericEntities } from '../../../Generics/generic.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity extends GenericEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column('int')
  number: number;

  @Column('int')
  size: number;

  @Column({
    length: 255,
  })
  adress: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column({
    length: 255,
  })
  phone: string;

  @Column({
    length: 255,
    nullable: true,
  })
  web_site: string;

  @Column({
    length: 255,
    nullable: true,
  })
  logo: string;

  @Column({
    length: 255,
    nullable: true,
  })
  complement_adress: string;

  @Column({
    length: 255,
  })
  zip_code: string;

  @Column({
    length: 255,
  })
  city: string;
}
