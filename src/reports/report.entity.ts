import { User } from "src/users/user.entity"
import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm"


@Entity()
export class Report{
 @PrimaryGeneratedColumn()
 id:number

 @Column({default:false})
 approved:boolean

 @Column()
 price:number

 @Column()
 make:string

 @Column()
 model:string

 @Column()
 year:number

 @Column()
 lng:number

 @Column()
 lat:number

 @Column()
 mileage:number


 // @ManyTOOne's 1st argument is function to resolve the circular dependency
 //              2nd argument is how to relate that entity in current entity, eg here user have reports column in which report will be there
 @ManyToOne(()=> User,(user)=>user.reports)
 user: User

} 