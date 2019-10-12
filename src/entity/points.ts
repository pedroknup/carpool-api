import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {preferences} from "./preferences";
import {route_points} from "./route_points";


@Entity("points" ,{schema:"caronapp_bd" } )
@Index("id_region_idx",["id_region",])
export class points {

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
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"lat"
        })
    lat:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"long"
        })
    long:number | null;
        

    @Column("int",{ 
        nullable:false,
        name:"id_region"
        })
    id_region:number;
        

   
    @OneToMany(()=>preferences, (preferences: preferences)=>preferences.idPoint,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    preferencess:preferences[];
    

   
    @OneToMany(()=>route_points, (route_points: route_points)=>route_points.idPoint,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    routePointss:route_points[];
    
}
