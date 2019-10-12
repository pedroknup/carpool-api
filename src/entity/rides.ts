import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";
import {regions} from "./regions";
import {confirmed_users} from "./confirmed_users";
import {messages} from "./messages";


@Entity("rides" ,{schema:"caronapp_bd" } )
@Index("id_region_idx",["idRegion",])
@Index("id_user_idx",["idUser",])
export class rides {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"outgoing"
        })
    outgoing:number | null;
        

    @Column("int",{ 
        nullable:false,
        name:"spots"
        })
    spots:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"time"
        })
    time:Date;
        

    @Column("varchar",{ 
        nullable:true,
        length:12,
        name:"type"
        })
    type:string | null;
        

   
    @ManyToOne(()=>users, (users: users)=>users.ridess,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_user'})
    idUser:users | null;


    @Column("json",{ 
        nullable:false,
        name:"route"
        })
    route:object;
        

   
    @ManyToOne(()=>regions, (regions: regions)=>regions.ridess,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_region'})
    idRegion:regions | null;


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
        

   
    @OneToMany(()=>confirmed_users, (confirmed_users: confirmed_users)=>confirmed_users.idRide,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    confirmedUserss:confirmed_users[];
    

   
    @OneToMany(()=>messages, (messages: messages)=>messages.idRide,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    messagess:messages[];
    
}
