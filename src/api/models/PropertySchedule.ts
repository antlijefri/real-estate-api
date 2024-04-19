import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Commmon } from './Common';

@Entity('tbl_property_schedule')
export class PropertySchedule extends Commmon {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'property_id' })
  public propertyId: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'slug_name' })
  public slugName: string;

  @Column({ name: 'schedule_date' })
  public scheduleDate: string;

  @Column({ name: 'status' })
  public status: string;
}
