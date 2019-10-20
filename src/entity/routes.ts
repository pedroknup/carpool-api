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
import { destinations } from './destinations';
import { regions } from './regions';
import { route_points } from './route_points';

@Entity('routes', { schema: 'caronapp_bd' })
@Index('id_destination_idx', ['idDestination'])
@Index('id_user_idx', ['idUser'])
@Index('id_region_idx', ['idRegion'])
export class routes {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => users, (users: users) => users.routes, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_user' })
  idUser: users | null;

  @Column('varchar', {
    nullable: false,
    length: 35,
    name: 'name'
  })
  name: string;

  @ManyToOne(() => destinations, (destinations: destinations) => destinations.routes, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_destination' })
  idDestination: destinations | null;

  @Column('json', {
    nullable: false,
    name: 'origin'
  })
  origin: object;

  @ManyToOne(() => regions, (regions: regions) => regions.routes, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_region' })
  idRegion: regions | null;

  @Column('json', {
    nullable: true,
    name: 'points'
  })
  points: object | null;

  @OneToMany(() => route_points, (route_points: route_points) => route_points.idRoute, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  routePoints: route_points[];
}
