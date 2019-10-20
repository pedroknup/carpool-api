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
import { provinces } from './provinces';
import { destinations } from './destinations';
import { rides } from './rides';
import { routes } from './routes';
import { sponsors } from './sponsors';
import { types } from './types';
import { universities } from './universities';
import { points } from './points';

@Entity('regions', { schema: 'caronapp_bd' })
@Index('region-province', ['idProvince'])
export class regions {
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

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'description'
  })
  description: string | null;

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'image'
  })
  image: string | null;

  @ManyToOne(() => provinces, (provinces: provinces) => provinces.regions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_province' })
  idProvince: provinces | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'keywords'
  })
  keywords: string | null;

  @Column('json', {
    nullable: true,
    name: 'times'
  })
  times: object | null;

  @OneToMany(() => destinations, (destinations: destinations) => destinations.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  destinations: destinations[];

  @OneToMany(() => rides, (rides: rides) => rides.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  rides: rides[];

  @OneToMany(() => routes, (routes: routes) => routes.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  routes: routes[];

  @OneToMany(() => sponsors, (sponsors: sponsors) => sponsors.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  sponsors: sponsors[];

  @OneToMany(() => types, (types: types) => types.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  types: types[];

  @OneToMany(() => universities, (universities: universities) => universities.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  universities: universities[];

  @OneToMany(() => points, (points: points) => points.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  points: points[];
}
