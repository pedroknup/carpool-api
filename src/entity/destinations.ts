import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {regions} from "./regions";
import {routes} from "./routes";


@Entity("destinations" ,{schema:"caronapp_bd" } )
@Index("id_region_idx",["idRegion",])
export class destinations {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

   
    @ManyToOne(()=>regions, (regions: regions)=>regions.destinationss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'id_region'})
    idRegion:regions | null;


   
    @OneToMany(()=>routes, (routes: routes)=>routes.idDestination,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    routess:routes[];
    
}
