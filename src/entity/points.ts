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
import { regions } from './regions';
import { preferences } from './preferences';
import { route_points } from './route_points';

@Entity('points', { schema: 'caronapp_bd' })
@Index('id_region_idx', ['idRegion'])
export class points {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'name'
  })
  name: string;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'lat'
  })
  lat: number | null;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'long'
  })
  long: number | null;

  @ManyToOne(() => regions, (regions: regions) => regions.points, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_region' })
  idRegion: regions | null;

  @Column('longtext', {
    nullable: true,
    name: 'picture'
  })
  picture: string | null;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'reference'
  })
  reference: string | null;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'region'
  })
  region: string | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => "'1'",
    name: 'isActive'
  })
  isActive: boolean | null;

  @Column('longtext', {
    nullable: true,
    name: 'picture_small'
  })
  picture_small: string | null;

  @OneToMany(() => preferences, (preferences: preferences) => preferences.idPoint, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  preferences: preferences[];

  @OneToMany(() => route_points, (route_points: route_points) => route_points.idPoint, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  routePoints: route_points[];
}
