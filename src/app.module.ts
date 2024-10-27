import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnowledgesModule } from './knowledges/knowledges.module';
import { SubCateModule } from './sub_cate/sub_cate.module';
import { CatagoryModule } from './catagory/catagory.module';
import { GroupModule } from './group/group.module';
import { CommentsModule } from './comments/comments.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
    }),
    AuthModule,
    UsersModule,
    KnowledgesModule,
    SubCateModule,
    CatagoryModule,
    GroupModule,
    CommentsModule,
  ],
})
export class AppModule {}
