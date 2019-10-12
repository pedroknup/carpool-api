import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {regions} from "./regions";


@Entity("types" ,{schema:"caronapp_bd" } )
@Index("id_region_idx",["idRegion",])
export class types {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"name"
        })
    name:string;
        

   
    @ManyToOne(()=>regions, (regions: regions)=>regions.typess,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_region'})
    idRegion:regions | null;

}
