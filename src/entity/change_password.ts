import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("change_password" ,{schema:"caronapp_bd" } )
@Index("id_user_idx",["idUser",])
export class change_password {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:56,
        name:"token"
        })
    token:string;
        

   
    @ManyToOne(()=>users, (users: users)=>users.changePasswords,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("datetime",{ 
        nullable:false,
        name:"expires_at"
        })
    expires_at:Date;
        
}
