import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("rating_badges" ,{schema:"caronapp_bd" } )
@Index("id_rating_idx",["id_rating",])
@Index("id_badge_idx",["id_badge",])
export class rating_badges {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_rating"
        })
    id_rating:number;
        

    @Column("int",{ 
        nullable:false,
        name:"id_badge"
        })
    id_badge:number;
        
}
