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
import { points } from './points';
import { users } from './users';

@Entity('preferences', { schema: 'caronapp_bd' })
@Index('id_user_idx', ['idUser'])
@Index('id_point-preferences_idx', ['idPoint'])
export class preferences {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => points, (points: points) => points.preferences, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_point' })
  idPoint: points | null;

  @ManyToOne(() => users, (users: users) => users.preferences, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_user' })
  idUser: users | null;
}
