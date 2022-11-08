import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/Update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {

    cv: CvEntity[] = [];

    constructor(
        @InjectRepository(CvEntity) 
        private cvRepository: Repository<CvEntity>,
        private userService: UserService
        ){
        
    }

    async getCvs(user){

       /*  console.log("Auth Service", user);
        console.log("Items", this.cvRepository.find({
            where: {
                user: user,
            },
        })); */
        if (user.role === UserRoleEnum.ADMIN) {
            return await this.cvRepository.find();
        }
        else{
            return await this.cvRepository.find({
                where: {
                   user
                },
            });
        }
        
    }
 
    async getCvById(id: number, user){
        
        const cv = await this.cvRepository.findOneBy({id});

        if(!cv){
            throw new NotFoundException(`CV id ${id} does not exist.`);
        }
        if (this.userService.isOwnerOrAdmin(cv, user)) {
            return cv;  
        }
        else{
            throw new UnauthorizedException('Unauthorized action!');
        }
    }

    async addCv(cv: AddCvDto, user) : Promise<CvEntity>{
        const newCv = this.cvRepository.create(cv);
        newCv.user = user;
        return await this.cvRepository.save(newCv);
    }

    async updateCv(id: number, cv: UpdateCvDto, user): Promise<CvEntity>{
        const newCv = await this.cvRepository.preload({
            id,  ...cv
        })
        
        if (!newCv) {
            
            throw new NotFoundException(`Id CV ${id} does not exist.`);
        }

        if (this.userService.isOwnerOrAdmin(newCv, user)) {
            return await this.cvRepository.save(newCv, user);
        }
        else{
           throw new UnauthorizedException('Unauthorized action!');
        }

    }

    updateCv2(updateCriteria, cv: UpdateCvDto){
        return this.cvRepository.update(updateCriteria, cv);
    }

    /* async removeCv(id: number){

        const cvToRemove = await this.getCvById(id);
 
        return await this.cvRepository.remove(cvToRemove);
    } */

    async softDeleteCv(id: number, user) {
        const cv = await this.getCvById(id, user);
        if (!cv) {
            
            throw new NotFoundException(`Id CV ${id} does not exist.`);
        }
        if (this.userService.isOwnerOrAdmin(cv, user)) {
            return this.cvRepository.softDelete(id);
        }
        else{
           throw new UnauthorizedException('Unauthorized action!');
        }
    }

    async restoreCv(id: number, user) {
        const cv = await this.cvRepository.findOneBy({id});
        if (!cv) {
            
            throw new NotFoundException(`Id CV ${id} does not exist.`);
        }
        if (this.userService.isOwnerOrAdmin(cv, user)) {
            this.cvRepository.restore(id);
        }
        else{
           throw new UnauthorizedException('Unauthorized action!');
        }
    }

    async deleteCv(id: number){

        return await this.cvRepository.delete(id);
        
    }

    async statCvNumberByAge(maxAge, minAge: 0){

        // Create a queryBuilder
        const qb = await this.cvRepository.createQueryBuilder("cv");

        // Find the number of Cvs by age
        qb.select("cv.age, count(cv.id) as nbOfCv")
          .where("cv.age > :minAge and cv.age < :maxAge")
          .setParameters({minAge, maxAge})
          .groupBy("cv.age");

        console.log(qb.getSql()) 

        return await qb.getRawMany();
    }
}
 