import { Injectable } from '@nestjs/common';
import { AddUserDto } from './dto/addUser.dto';
import { Logger } from 'src/shared/logger/logger.service';
const users = [
    {
        id: 1,
        name: "John",
        email: "john@gmail.com"
    },
    {
        id: 2,
        name: "shon",
        email: "shon@gmail.com"
    },
    {
        id: 3,
        name: "syam",
        email: "syam@gmail.com"
    },
    {
        id: 4,
        name: "ram",
        email: "ram@gmail.com"
    },
]
@Injectable()
export class UserService {

    constructor(private readonly logger: Logger) { }

   async findAllUser(): Promise<any[]> {
        try {
            return users;
        } catch (error) {
            this.logger.error(error)
        }
    };

   async findById(id: number) {
        try {
            return users.find((i) => i.id === id)
        } catch (error) {
            this.logger.error(error)
        }
    };
    
   async addUser(userDto: AddUserDto) {
        try {
            const { name, email } = userDto
            users.push({ id: 5, name, email });
            return {
                added: 1,
                status: "success"
            }
        } catch (error) {
            this.logger.error(error)
        }
    };
}
