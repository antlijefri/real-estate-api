import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './Property';

@Entity('tbl_property_image')
export class PropertyImage {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'property_id' })
  public propertyId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'path' })
  public path: string;

  @Column({ name: 'is_default' })
  public isDefault: number;

  @ManyToOne((type) => Property, (property) => property)
  @JoinColumn({ name: 'property_id' })
  public property: Property;
}
