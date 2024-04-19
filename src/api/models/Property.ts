import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Commmon } from './Common';
import { User } from './User';
import { PropertyImage } from './PropertyImage';

@Entity('tbl_property')
export class Property extends Commmon {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

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

  @OneToMany(
    (type) => PropertyImage,
    (propertyImage) => propertyImage.property,
    { cascade: true }
  )
  public propertyImage: PropertyImage[];
}
