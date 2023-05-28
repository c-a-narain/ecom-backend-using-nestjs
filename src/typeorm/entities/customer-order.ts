import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'customer_orders', synchronize: false })
export class customer_orders {
  @PrimaryColumn()
  CUSTOMER_EMAIL: string;

  @Column()
  PRODUCT_ID: number;

  @Column()
  STATUS: number;
}
