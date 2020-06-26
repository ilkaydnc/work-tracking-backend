import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Ad {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  locationId: string

  @Column()
  sectorId: string

  @Column()
  amount: number

  @Column()
  date: string
}
