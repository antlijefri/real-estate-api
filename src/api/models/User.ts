import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Commmon } from './Common';
import { Property } from './Property';

@Entity('tbl_user')
export class User extends Commmon {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'password' })
  public password: string;

  @Column({ name: 'mobile', type: 'bigint' })
  public mobile: number;

  @Column({ name: 'image_name' })
  public imageName: string;

  @Column({ name: 'image_path' })
  public imagePath: string;

  @Column({ name: 'otp', default: '' })
  public otp: string;

  @OneToMany((type) => Property, (property) => property.user)
  public property: Property[];
}
