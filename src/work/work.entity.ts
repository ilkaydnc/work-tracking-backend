import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Work {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  partnerId: string;

  @Column()
  locationId: string;

  @Column()
  sectorId: string;

  @Column()
  amount: number;

  @Column()
  date: string;
}
