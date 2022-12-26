import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupbudgetModule } from './groupbudget/groupbudget.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, GroupbudgetModule, PrismaModule],
})
export class AppModule {}
