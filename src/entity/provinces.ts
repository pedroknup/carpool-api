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
} from "typeorm";

@Entity("provinces", { schema: "caronapp_bd" })
export class provinces {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id"
  })
  id: number;

  @Column("varchar", {
    nullable: false,
    length: 45,
    name: "name"
  })
  name: string;

  @Column("varchar", {
    nullable: false,
    length: 2,
    name: "acronym"
  })
  acronym: string;
}
