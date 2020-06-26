import {
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Work {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  partnerId: string

  @Column()
  locationId: string

  @Column()
  sectorId: string

  @Column()
  amount: number

  @Column()
  date: Date

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}
