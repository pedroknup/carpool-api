import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("blocks" ,{schema:"caronapp_bd" } )
@Index("id_user_idx",["idUser",])
export class blocks {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(()=>users, (users: users)=>users.blockss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("varchar",{ 
        nullable:true,
        length:95,
        name:"reason"
        })
    reason:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"ban_date"
        })
    ban_date:Date | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:65,
        name:"email"
        })
    email:string | null;
        
}
