import { PropertyModel } from 'src/core/properties/core/model/property-model';
import { BaseModel } from 'src/shared/core/models/base-model';

export class UserModel extends BaseModel<UserModel> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  properties?: PropertyModel[];

  public constructor(data: UserModel) {
    super();
    Object.assign(this, data);
  }
}
