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
import { routes } from './routes';
import { points } from './points';

@Entity('route_points', { schema: 'caronapp_bd' })
@Index('id_route_idx', ['idRoute'])
@Index('id_point_idx', ['idPoint'])
export class route_points {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => routes, (routes: routes) => routes.routePoints, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_route' })
  idRoute: routes | null;

  @Column('json', {
    nullable: true,
    name: 'point'
  })
  point: object | null;

  @ManyToOne(() => points, (points: points) => points.routePoints, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'id_point' })
  idPoint: points | null;
}
