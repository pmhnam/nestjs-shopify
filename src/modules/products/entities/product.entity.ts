import { InferAttributes, InferCreationAttributes, UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: true,
  createdAt: 'createdDate',
  updatedAt: false,
})
export default class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @PrimaryKey
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  productType: string;

  @Column({ type: DataType.STRING({ length: 1000 }), allowNull: false })
  imageUrl: string;
}
