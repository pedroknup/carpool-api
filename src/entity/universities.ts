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

@Entity('universities', { schema: 'caronapp_bd' })
@Index('id_region_idx', ['idRegion'])
export class universities {
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

  @ManyToOne(() => regions, (regions: regions) => regions.universities, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'id_region' })
  idRegion: regions | null;

  @Column('varchar', {
    nullable: true,
    length: 64,
    name: 'picture'
  })
  picture: string | null;
}
