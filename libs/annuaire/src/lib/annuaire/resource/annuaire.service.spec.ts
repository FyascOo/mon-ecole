import { Test, TestingModule } from '@nestjs/testing';
import { AnnuaireService } from './annuaire.service';

describe('AnnuaireService', () => {
  let service: AnnuaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnuaireService],
    }).compile();

    service = module.get<AnnuaireService>(AnnuaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
