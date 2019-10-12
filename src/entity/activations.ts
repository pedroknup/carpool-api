import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("activations" ,{schema:"caronapp_bd" } )
@Index("id_user_idx",["idUser",])
export class activations {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"code"
        })
    code:number;
        

   
    @ManyToOne(()=>users, (users: users)=>users.activationss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("datetime",{ 
        nullable:false,
        name:"expires_at"
        })
    expires_at:Date;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"phone"
        })
    phone:string | null;
        
}
