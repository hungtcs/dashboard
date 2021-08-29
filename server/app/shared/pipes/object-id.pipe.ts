import { ObjectId } from 'mongodb';
import { ForbiddenException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ObjectIDPipe implements PipeTransform {

  public transform(value: string | Array<string>) {
    if(Array.isArray(value)) {
      return value.map(id => this.string2ObjectID(id));
    } else {
      return this.string2ObjectID(value);
    }
  }

  private string2ObjectID(id: string) {
    if(ObjectId.isValid(id)) {
      return ObjectId.createFromHexString(id);
    } else {
      throw new ForbiddenException(`ObjectID argument passed in must be a single String of 12 bytes or a string of 24 hex characters`);
    }
  }

}
