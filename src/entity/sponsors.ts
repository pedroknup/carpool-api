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

@Entity('sponsors', { schema: 'caronapp_bd' })
@Index('id_region_idx', ['idRegion'])
export class sponsors {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: true,
    length: 120,
    name: 'picture'
  })
  picture: string | null;

  @Column('varchar', {
    nullable: true,
    length: 80,
    name: 'link'
  })
  link: string | null;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'name'
  })
  name: string;

  @Column('longtext', {
    nullable: true,
    name: 'text'
  })
  text: string | null;

  @ManyToOne(() => regions, (regions: regions) => regions.sponsors, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_region' })
  idRegion: regions | null;
}
