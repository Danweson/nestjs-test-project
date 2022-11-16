import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GenericEntities {
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() //Implémente le soft delete ,les données ne sont pas réellement supprimées
  deletedAt: Date;

  @Column({})
  is_active: boolean;

  @Column({})
  data_state: number;

  @Column()
  status: number;
}
