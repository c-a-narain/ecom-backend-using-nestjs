import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'admins', synchronize: false })
export class admin {
  @PrimaryColumn()
  EMPID: string;

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
  password: string;
}
