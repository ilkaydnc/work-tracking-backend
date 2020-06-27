import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Location {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}
