import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";
import {rides} from "./rides";


@Entity("confirmed_users" ,{schema:"caronapp_bd" } )
@Index("id_ride_idx",["idRide",])
@Index("id_user_idx",["idUser",])
export class confirmed_users {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(()=>users, (users: users)=>users.confirmedUserss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("json",{ 
        nullable:false,
        name:"point"
        })
    point:object;
        

    @Column("time",{ 
        nullable:false,
        name:"time"
        })
    time:string;
        

   
    @ManyToOne(()=>rides, (rides: rides)=>rides.confirmedUserss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_ride'})
    idRide:rides | null;


    @Column("int",{ 
        nullable:true,
        default: () => "'1'",
        name:"quantity"
        })
    quantity:number | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"created_at"
        })
    created_at:Date | null;
        
}