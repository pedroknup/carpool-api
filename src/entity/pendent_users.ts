import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import { users } from './users';


@Entity('pendent_users', { schema: 'caronapp_bd' })
@Index('id_ride_idx', ['id_ride'])
@Index('id_user_idx', ['user'])
export class pendent_users {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'id_ride'
  })
  id_ride: number;

  @ManyToOne(() => users, (users: users) => users.pendentUsers, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_user' })
  user: users | null;

  @Column('int', {
    nullable: true,
    name: 'quantity'
  })
  quantity: number | null;

  @Column('datetime', {
    nullable: true,
    name: 'created_at'
  })
  created_at: Date | null;

  @Column('int', {
    nullable: false,
    name: 'id_route_point'
  })
  id_route_point: number;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'message'
  })
  message: string | null;
}
