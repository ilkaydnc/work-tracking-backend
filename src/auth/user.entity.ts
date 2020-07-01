import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  salt: string

  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)

    return hash === this.password
  }
}
