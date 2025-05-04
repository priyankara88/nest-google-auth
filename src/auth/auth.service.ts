import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './schemas/create.user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserEntity } from './entities/create.user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,

    private jwtservice: JwtService,
  ) {}
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

  async googlecallback(req, res) {
    const IsEmail = await this.userModel.findOne({ email: req.email });
    const token = this.createToken(IsEmail?._id);
    if (!IsEmail) {
      await this.userModel.create({
        name: req.firstName,
        email: req.email,
        password: 'gmail',
      });

      return token;
    }
  }

  async createToken(id) {
    return await this.jwtservice.sign({ userid: id });
  }
}
