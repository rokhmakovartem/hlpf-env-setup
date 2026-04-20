import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Реєстрація нового користувача',
    description: 'Створює нового користувача з роллю USER за замовчуванням.',
  })
  @ApiResponse({ status: 201, description: 'Користувача зареєстровано' })
  @ApiResponse({ status: 400, description: 'Помилка валідації' })
  @ApiResponse({ status: 409, description: 'Email вже використовується' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Вхід користувача',
    description: 'Повертає JWT access token для авторизації.',
  })
  @ApiResponse({ status: 200, description: 'Успішний вхід, повертає токен' })
  @ApiResponse({ status: 401, description: 'Невірний email або пароль' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
