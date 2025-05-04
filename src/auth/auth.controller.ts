import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { CreateUserEntity } from './entities/create.user.entity';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createuserdto: CreateUserDto,
  ): Promise<CreateUserEntity> {
    return this.authService.signup(createuserdto);
  }
}
