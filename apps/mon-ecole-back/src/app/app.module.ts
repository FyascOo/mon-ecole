import { Module } from '@nestjs/common';

import { Annuaire, AnnuaireModule } from '@mon-ecole/annuaire';
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
      synchronize: true,
      logging: true,
    }),
    AnnuaireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
