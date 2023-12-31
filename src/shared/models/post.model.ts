import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { User, Comment, Score, Rent, Favorite } from '.';

enum conditionType {
  SELL = 'SELL',
  RENT = 'RENT',
}

@Table({
  tableName: 'posts',
  timestamps: true,
})
export class Post extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  available: boolean;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  condition: conditionType;

  @Column({ allowNull: false, type: DataType.ARRAY(DataType.STRING) })
  images: Array<string>;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  title: string;

  @Column({ allowNull: false, unique: false, type: DataType.STRING })
  country: string;

  @Column({ allowNull: false, unique: false, type: DataType.STRING })
  city: string;

  @Column({ allowNull: false, type: DataType.STRING })
  streetName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  streetNumber: string;

  @Column({ type: DataType.STRING })
  floorNumber: string;

  @Column({ type: DataType.STRING })
  aptNumber: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ allowNull: false, type: DataType.STRING(1000) })
  description: string;

  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataType.UUID })
  userId: string;

  @DeletedAt
  deleteAt: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Score)
  scores: Score[];

  @HasMany(() => Rent) //Rent === Reservation !IMPORTANT -> Change the name of the model
  rents: Rent[];

  @BelongsToMany(() => User, () => Favorite)
  favorites: Favorite[];
}
