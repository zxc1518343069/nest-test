import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IsPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
