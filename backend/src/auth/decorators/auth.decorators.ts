import { Rol } from '../../shared/enums/rol.enum';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorators';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(...roles: Rol[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
