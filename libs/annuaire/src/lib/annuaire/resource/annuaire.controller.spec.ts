import { Test, TestingModule } from '@nestjs/testing';
import { AnnuaireController } from './annuaire.controller';
import { AnnuaireService } from './annuaire.service';

describe('AnnuaireController', () => {
  let controller: AnnuaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnuaireController],
      providers: [AnnuaireService],
    }).compile();

    controller = module.get<AnnuaireController>(AnnuaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
