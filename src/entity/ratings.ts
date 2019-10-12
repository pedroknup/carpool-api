import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ratings" ,{schema:"caronapp_bd" } )
@Index("id_confirmed_user_idx",["id_confirmed_user",])
export class ratings {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_confirmed_user"
        })
    id_confirmed_user:number;
        

    @Column("int",{ 
        nullable:false,
        name:"rating"
        })
    rating:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:120,
        name:"review"
        })
    review:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"created_at"
        })
    created_at:Date | null;
        
}
