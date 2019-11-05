import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm';
import { users } from './users';
import { rides } from './rides';

@Entity('confirmed_users', { schema: 'caronapp_bd' })
@Index('id_ride_idx', ['ride'])
@Index('id_user_idx', ['user'])
export class confirmed_users {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => users, (users: users) => users.confirmedUsers, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_user' })
  user: users | null;

  @Column('int', {
    nullable: false,
    name: 'id_route_point'
  })
  id_route_point: number;

  @Column('time', {
    nullable: false,
    name: 'time'
  })
  time: Date;

  @ManyToOne(() => rides, (rides: rides) => rides.confirmedUsers, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_ride' })
  ride: rides | null;

  @Column('int', {
    nullable: true,
    default: () => "'1'",
    name: 'quantity'
  })
  quantity: number | null;

  @Column('datetime', {
    nullable: true,
    name: 'created_at'
  })
  created_at: Date | null;
}
