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
import { activations } from "./activations";
import { blocks } from "./blocks";
import { confirmed_users } from "./confirmed_users";
import { messages } from "./messages";
import { change_password } from "./change_password";
import { preferences } from "./preferences";
import { rides } from "./rides";
import { routes } from "./routes";
import { sessions } from "./sessions";
import { warnings } from "./warnings";
import * as bcrypt from "bcryptjs";
import { pendent_users } from './pendent_users';

@Entity("users", { schema: "caronapp_bd" })
export class users {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id"
  })
  id: number;

  @Column("varchar", {
    nullable: false,
    length: 45,
    name: "first_name"
  })
  first_name: string;

  @Column("varchar", {
    nullable: false,
    length: 45,
    name: "full_name"
  })
  full_name: string;

  @Column("bigint", {
    nullable: true,
    name: "facebook_id"
  })
  facebook_id: string | null;

  @Column("int", {
    nullable: true,
    name: "ride_as_driver"
  })
  ride_as_driver: number | null;

  @Column("int", {
    nullable: true,
    name: "ride_as_user"
  })
  ride_as_user: number | null;

  @Column("datetime", {
    nullable: true,
    name: "created_at"
  })
  created_at: Date | null;

  @Column("varchar", {
    nullable: true,
    length: 50,
    name: "car_brand"
  })
  car_brand: string | null;

  @Column("varchar", {
    nullable: true,
    length: 45,
    name: "car_model"
  })
  car_model: string | null;

  @Column("varchar", {
    nullable: true,
    length: 45,
    name: "car_color"
  })
  car_color: string | null;

  @Column("varchar", {
    nullable: true,
    length: 45,
    name: "email"
  })
  email: string | null;

  @Column("varchar", {
    nullable: true,
    length: 45,
    name: "phone"
  })
  phone: string | null;

  @Column("varchar", {
    nullable: true,
    length: 200,
    name: "picture"
  })
  picture: string | null;

  @Column("longtext", {
    nullable: false,
    name: "password"
  })
  password: string;

  @Column("tinyint", {
    nullable: true,
    name: "activated"
  })
  activated: number | null;

  @Column("varchar", {
    nullable: false,
    length: 45,
    name: "id_region"
  })
  id_region: string;

  @Column("varchar", {
    nullable: true,
    length: 10,
    name: "course"
  })
  course: string | null;

  @Column("varchar", {
    nullable: true,
    length: 6,
    name: "course_ingression"
  })
  course_ingression: string | null;

  @Column("tinyint", {
    nullable: true,
    name: "show_number"
  })
  show_number: number | null;

  @OneToMany(
    () => activations,
    (activations: activations) => activations.idUser,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  activationss: activations[];

  @OneToMany(() => blocks, (blocks: blocks) => blocks.idUser, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  blockss: blocks[];

  @OneToMany(
    () => confirmed_users,
    (confirmed_users: confirmed_users) => confirmed_users.user,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  confirmedUsers: confirmed_users[];
  
  @OneToMany(
    () => pendent_users,
    (pendent_users: pendent_users) => pendent_users.user,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  pendentUsers: pendent_users[];

  @OneToMany(() => messages, (messages: messages) => messages.user, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  messagess: messages[];

  @OneToMany(
    () => change_password,
    (change_password: change_password) => change_password.idUser,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  changePasswords: change_password[];

  @OneToMany(
    () => preferences,
    (preferences: preferences) => preferences.idUser,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  preferences: preferences[];

  @OneToMany(() => rides, (rides: rides) => rides.user, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  rides: rides[];

  @OneToMany(() => routes, (routes: routes) => routes.idUser, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  routes: routes[];

  @OneToMany(() => sessions, (sessions: sessions) => sessions.idUser, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  sessionss: sessions[];

  @OneToMany(() => warnings, (warnings: warnings) => warnings.idUser, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
  })
  warnings: warnings[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
