import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("sessions" ,{schema:"caronapp_bd" } )
@Index("id_user_idx",["idUser",])
export class sessions {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("longtext",{ 
        nullable:false,
        name:"token"
        })
    token:string;
        

   
    @ManyToOne(()=>users, (users: users)=>users.sessionss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("datetime",{ 
        nullable:false,
        name:"expires_at"
        })
    expires_at:Date;
        

    @Column("datetime",{ 
        nullable:false,
        name:"created_at"
        })
    created_at:Date;
        
}
