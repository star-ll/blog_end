import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { RoleType } from 'src/config/auth.config';
import { AuthGuard } from 'src/modules/auth/auth.guard';

// Auth
export const Roles = (...roles: RoleType[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  );

// HTTP Request
export const PostContent = () =>
  applyDecorators(
    ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
  );
