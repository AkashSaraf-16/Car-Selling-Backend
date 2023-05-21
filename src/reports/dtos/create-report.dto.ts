import {
 IsString,IsNumber,Max,Min,IsLongitude,IsLatitude
} from "class-validator"


export class createReportDto{
 @IsString()
 make:string;

 @IsString()
 model:string;

 @IsNumber()
 @Min(1900)
 @Max(2050)
 year:number;

 @IsNumber()
 @Min(1)
 @Max(100)
 mileage:number;

 @IsLongitude()
 lng:number;

 @IsLatitude()
 lat:number;

 @IsNumber()
 @Min(1)
 @Max(10000000)
 price:number

}