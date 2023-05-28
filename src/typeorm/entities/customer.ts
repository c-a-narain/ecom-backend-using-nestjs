import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'customer', synchronize: false })
export class customer {
  @PrimaryColumn()
  CustId: string;

  @Column()
  NAME: string;

  @Column()
  CONTACT: string;

  @Column()
  EMAIL: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
  })
  GENDER: string;

  @Column()
  ADDRESS: string;

  @Column()
  password: string;
}
