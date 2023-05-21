import { Report } from 'src/reports/report.entity';
import { Entity,Column,PrimaryGeneratedColumn,AfterInsert,AfterUpdate,AfterRemove,OneToMany } from 'typeorm'
// import { Exclude } from "class-transformer"
@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 email: string;
 
 @Column({default: true})
 admin: boolean;

 @Column()
 // @Exclude()
 password: string

 @OneToMany(()=> Report,(report)=>report.user)
 reports: Report[]

 @AfterInsert()
 logInsert(){
  console.log("Inserted the user",this.id)
 }
 @AfterUpdate()
 logUpdate(){
  console.log("Updated the user",this.id)
 } 
 @AfterRemove()
 logRemove(){
  console.log("Removed the user",this.id)
 }
}