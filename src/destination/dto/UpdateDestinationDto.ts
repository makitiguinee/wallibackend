import { CreateDestinationDto } from './CreateDestinationDto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {}
