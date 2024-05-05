import { Module } from '@nestjs/common';

import { Annuaire, AnnuaireApiModule } from '@mon-ecole/annuaire-api';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mon-ecole',
      entities: [Annuaire],
      logging: true,
    }),
    AnnuaireApiModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
