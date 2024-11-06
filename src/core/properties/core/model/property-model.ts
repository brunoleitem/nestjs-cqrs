import { BaseModel } from 'src/shared/core/models/base-model';

export class PropertyModel extends BaseModel<PropertyModel> {
  address: string;
  price: number;
  likes: number;

  private constructor(data: PropertyModel) {
    super();
    Object.assign(this, data);
  }
}
