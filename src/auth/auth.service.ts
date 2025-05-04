import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './schemas/create.user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserEntity } from './entities/create.user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async signup(createuserdto: CreateUserDto): Promise<CreateUserEntity> {
    const { name, email, password } = createuserdto;
    const IsEmail = await this.userModel.findOne({ email });

    if (IsEmail) {
      throw new BadRequestException('User Alrady Exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const Result = await this.userModel.create({
      name,
      email,
      password: hashPassword,
    });
    return { email: Result.email };
  }
}
