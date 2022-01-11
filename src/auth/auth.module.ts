import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt/jwt.strategy";
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.SECRETORKEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema } ]),
  ],
  providers: [AuthService, JwtStrategy, AuthRepository ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthRepository ],
})
export class AuthModule {}
