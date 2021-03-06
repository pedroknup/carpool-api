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
import { rides } from './rides';
import { users } from './users';

@Entity('messages', { schema: 'caronapp_bd' })
@Index('id_user_idx', ['user'])
@Index('id_ride_idx', ['ride'])
export class messages {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => rides, (rides: rides) => rides.messages, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_ride' })
  ride: rides | null;

  @ManyToOne(() => users, (users: users) => users.messagess, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_user' })
  user: users | null;

  @Column('varchar', {
    nullable: false,
    length: 96,
    name: 'text'
  })
  text: string;

  @Column('datetime', {
    nullable: false,
    name: 'created_at'
  })
  created_at: Date;
}
