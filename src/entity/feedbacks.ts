import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("feedbacks" ,{schema:"caronapp_bd" } )
export class feedbacks {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:80,
        name:"feedback"
        })
    feedback:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:80,
        name:"name"
        })
    name:string | null;
        
}
