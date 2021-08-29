import { ObjectIDPipe } from '../pipes';
import { Param, PipeTransform, Type } from '@nestjs/common';

export function ObjectIdParam(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]) {
  return Param(property, ObjectIDPipe, ...pipes);
}
