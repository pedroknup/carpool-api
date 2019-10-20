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
import { routes } from './routes';

@Entity('destinations', { schema: 'caronapp_bd' })
@Index('id_region-destination_idx', ['idRegion'])
export class destinations {
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

  @ManyToOne(() => regions, (regions: regions) => regions.destinations, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_region' })
  idRegion: regions | null;

  @Column('double', {
    nullable: true,
    default: () => "'0'",
    precision: 22,
    name: 'lat'
  })
  lat: number | null;

  @Column('double', {
    nullable: true,
    default: () => "'0'",
    precision: 22,
    name: 'long'
  })
  long: number | null;

  @Column('varchar', {
    nullable: true,
    length: 45,
    default: () => "'Universidades'",
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

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'reference'
  })
  reference: string | null;

  @Column('longtext', {
    nullable: true,
    name: 'picture'
  })
  picture: string | null;

  @Column('longtext', {
    nullable: true,
    name: 'picture_small'
  })
  picture_small: string | null;

  @OneToMany(() => routes, (routes: routes) => routes.idDestination, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  routes: routes[];
}
