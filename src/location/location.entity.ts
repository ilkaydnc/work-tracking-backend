import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm'

@Entity()
export class Location {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  name: string
}
