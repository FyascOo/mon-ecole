import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnuaireDto } from './create-annuaire.dto';

export class UpdateAnnuaireDto extends PartialType(CreateAnnuaireDto) {}
