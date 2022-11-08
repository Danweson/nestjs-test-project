import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/Update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {

    constructor(private cvService: CvService){ 

    }

    // Find the number of Cvs by age
    @Get('stats/:max/:min')
    @UseGuards(JwtAuthGuard)
    async statCvNumberByAge(@Param('max', ParseIntPipe) max, @Param('min', ParseIntPipe) min){  
        return await this.cvService.statCvNumberByAge(max, min);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCvs(
        @User() user
        ){
        // console.log("Auth User", user);
        // console.log("Items", this.cvService.getCvs(user));
        return await this.cvService.getCvs(user);
    } 

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getTodoById
    (
        @Param('id', ParseIntPipe) id,
        @User() user
    ){
       return await this.cvService.getCvById(id, user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
   async addCv( 
    @Body(ValidationPipe) addCvDto: AddCvDto, 
    @User() user
    /* @Req() request: Request */
    ): Promise<CvEntity>{
       /*  const user = request.user; */
      return await this.cvService.addCv(addCvDto, user);
    } 

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updatev( 
        @Param('id', ParseIntPipe) id, 
        @Body() newCv: UpdateCvDto,
        @User() user
        ): Promise<CvEntity>{

        return await this.cvService.updateCv(id, newCv, user);
    }
    
    @Patch()
    async updatev2( @Body() updateObject){

        const {updateCriteria, updateCvDto} = updateObject;

        return await this.cvService.updateCv2(updateCriteria, updateCvDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCv(
        @Param('id', ParseIntPipe) id,
        @User() user
        ){

        return await this.cvService.softDeleteCv(id, user);
    }

    @Get('recover/:id')
    @UseGuards(JwtAuthGuard)
    async restoreCv(
        @Param('id', ParseIntPipe) id : number,
        @User() user
        ){
        return await this.cvService.restoreCv(id, user);
    }

}
 