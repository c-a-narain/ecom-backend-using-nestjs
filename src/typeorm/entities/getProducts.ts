import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products', synchronize: false })
export class products {
  @PrimaryColumn()
  PRODUCT_ID: number;

  @Column()
  PRODUCT_NAME: string;

  @Column()
  PRODUCT_MODEL: string;

  @Column()
  AVAILABILITY: number;

  @Column()
  RATING: number;

  @Column({
    type: 'enum',
    enum: ['Phone', 'Tablet'],
  })
  TYPE: string;

  @Column()
  PRODUCT_PRICE: number;
}
