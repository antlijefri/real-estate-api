import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Commmon } from './Common';
import { User } from './User';

@Entity('tbl_property')
export class Property extends Commmon {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'type', type: 'enum', enum: ['house', 'land', 'apartment'] })
  public type: string;

  @Column({ name: 'location' })
  public location: string;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'is_sold' })
  public isSold: number;

  @ManyToOne((type) => User, (user) => user.property)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
