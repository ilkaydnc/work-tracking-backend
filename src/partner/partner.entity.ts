import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Partner {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  locationId: string

  @Column()
  sectorIds: string[]
}
