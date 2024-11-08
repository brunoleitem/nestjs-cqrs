import { UserModel } from 'src/core/identity/core/model/user-model';
import { BaseModel } from 'src/shared/core/models/base-model';

export class PropertyModel extends BaseModel<PropertyModel> {
  address: string;
  price: number;
  location: string;
  createdBy: UserModel;

  private constructor(data: PropertyModel) {
    super();
    Object.assign(this, data);
  }
}
