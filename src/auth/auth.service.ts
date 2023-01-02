import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user: Partial<Pick<User, 'hash'>> & Omit<User, 'hash'> =
        await this.prisma.user.create({
          data: {
            email: dto.email,
            hash,
            firstName: dto.firstName,
            lastName: dto.lastName,
          },
        });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const passwordMatches = await argon.verify(user.hash ?? '', dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const hashlessUser: Partial<Pick<User, 'hash'>> & Omit<User, 'hash'> = user;

    delete hashlessUser.hash;
    return hashlessUser;
  }
}
