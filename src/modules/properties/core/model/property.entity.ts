import type { UserEntity } from '@src/modules/identity/core/model/user.entity'
import { BaseEntity } from '@src/shared/core/models/base.entity'

export class PropertyEntity extends BaseEntity {
  address: string
  price: number
  location: string
  createdBy: UserEntity

  public constructor(data: PropertyEntity) {
    super()
    Object.assign(this, data)
  }
}
