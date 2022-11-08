import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){

    }

   async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>>{

        const user = this.userRepository.create({
            ...userData
        });

        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);

        try {
            await this.userRepository.save(user)
        } catch (error) {
            throw new ConflictException(`The username and password must be unique`);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password
        };

    }

    async login(credentials: LoginCredentialsDto){

        // Fetch the login and password
        const {username, password} = credentials;

        const user = await this.userRepository.createQueryBuilder("user")
              .where("user.username = :username or user.email = :username",
                {username}
                )
              .getOne();
            
            console.log(user);
            if (!user) {
                throw new NotFoundException('username ou password erroné');
            }
            
            const hashedPassword = await bcrypt.hash(password, user.salt);

            if (hashedPassword === user.password ) {
                const payload = {
                            username: user.username  , 
                            email: user.email,
                            role: user.role
                        }
                const jwt = await this.jwtService.sign(payload);
                return {
                    "access_token": jwt
                };
            }
            else{
                throw new NotFoundException('username ou password erroné');
            }
        
    }

    isOwnerOrAdmin(object, user){
        return user.role === UserRoleEnum.ADMIN || (object.user && object.user.id === user.id );
    }
}
