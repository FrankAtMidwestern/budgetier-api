import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupbudgetModule } from './groupbudget/groupbudget.module';

@Module({
  imports: [AuthModule, UserModule, GroupbudgetModule],
})
export class AppModule {}
