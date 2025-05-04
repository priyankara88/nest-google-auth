import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { CreateUserEntity } from './entities/create.user.entity';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createuserdto: CreateUserDto,
  ): Promise<CreateUserEntity> {
    return this.authService.signup(createuserdto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googlelogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googlecallback(@Req() req, @Res() res) {
    const token = await this.authService.googlecallback(req.user, res);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
}
