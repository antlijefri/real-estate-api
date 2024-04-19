import { Exclude } from 'class-transformer';
import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class Commmon {
  @Exclude()
  @Column({ name: 'created_date' })
  public createdDate: Date;

  @Exclude()
  @Column({ name: 'modified_date' })
  public modifiedDate: Date;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Exclude()
  @Column({ name: 'is_delete' })
  public isDelete: number;

  @BeforeInsert()
  public createDate(): void {
    this.createdDate = new Date(moment().format());
    this.modifiedDate = new Date(moment().format());
  }

  @BeforeUpdate()
  public modifyDate(): void {
    this.modifiedDate = new Date(moment().format());
  }
}
