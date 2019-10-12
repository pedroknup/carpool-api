import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("warnings" ,{schema:"caronapp_bd" } )
@Index("id_user_idx",["idUser",])
export class warnings {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"Id"
        })
    Id:number;
        

   
    @ManyToOne(()=>users, (users: users)=>users.warningss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"title"
        })
    title:string;
        

    @Column("longtext",{ 
        nullable:false,
        name:"body"
        })
    body:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"button"
        })
    button:string | null;
        
}
