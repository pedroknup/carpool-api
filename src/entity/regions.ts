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
import { destinations } from './destinations';
import { rides } from './rides';
import { routes } from './routes';
import { sponsors } from './sponsors';
import { types } from './types';
import { universities } from './universities';
import { provinces } from './provinces';

@Entity('regions', { schema: 'caronapp_bd' })
@Index('id_province', ['id_province'])
export class regions {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @ManyToOne(() => provinces, (provinces: provinces) => provinces.id, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_province' })
  province: provinces | null;

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
    length: 45,
    name: 'image'
  })
  image: string | null;

  @Column('int', {
    nullable: true,
    name: 'id_province'
  })
  id_province: number | null;

  @OneToMany(() => destinations, (destinations: destinations) => destinations.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  destinationss: destinations[];

  @OneToMany(() => rides, (rides: rides) => rides.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  ridess: rides[];

  @OneToMany(() => routes, (routes: routes) => routes.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  routess: routes[];

  @OneToMany(() => sponsors, (sponsors: sponsors) => sponsors.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  sponsorss: sponsors[];

  @OneToMany(() => types, (types: types) => types.idRegion, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  typess: types[];

  @OneToMany(() => universities, (universities: universities) => universities.idRegion, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  universitiess: universities[];
}
