import { PropertyEntity } from '@src/modules/properties/core/model/property.entity';
import { BaseEntity } from '@src/shared/core/models/base.entity';

export class UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favorites?: PropertyEntity[];

  public constructor(data: UserEntity) {
    super();
    Object.assign(this, data);
  }
}
