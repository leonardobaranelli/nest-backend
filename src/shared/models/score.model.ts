import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

enum scoreType {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  POST = 'POST'
}

@Table
export class Score extends Model {
  @PrimaryKey
  @AllowNull(false)  
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({allowNull: false, type: DataType.STRING})
  type: scoreType;

  @Column({allowNull: false, type: DataType.INTEGER})
  score: number;

  @Column({ allowNull:false, unique: true, type: DataType.STRING(1000)})  
  feedBack: string;

}