import { Transform,Expose } from "class-transformer";
export class ReportDto{
 @Expose()
 id:number;
 @Expose()
 make:string;
 @Expose()
 year:number;
 @Expose()
 lat:number;
 @Expose()
 lan:number;
 @Expose()
 model:string;
 @Expose()
 price:number;
 @Expose()
 mileage:number;
 @Expose()
 approved:boolean;
 // here "obj" is original report entity
 @Transform(({ obj })=> obj.user.id)
 @Expose()
 userId:number
}