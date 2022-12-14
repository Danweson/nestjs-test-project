import { type } from "os";
import { TimestampEntities } from "@/generics/timestamp.entities"
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity('cv')
export class CvEntity extends TimestampEntities {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    @Column({
        name: 'name',
        length: 50
    })
    name: string;

    @PrimaryColumn()
    @Column({
        name: 'firstname',
        length: 50
    })
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;


    @ManyToOne(
        type => UserEntity,
        (user) => user.cvs,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: UserEntity;
    
}
 