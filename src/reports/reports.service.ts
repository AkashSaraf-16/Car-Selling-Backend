/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { Report } from "./report.entity"
import { createReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from "./dtos/get-estimate.dto"
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
 constructor(@InjectRepository(Report) private repo:Repository<Report>){}

 create(reportDto:createReportDto,user:User){
  const report = this.repo.create(reportDto);
  report.user = user
  return this.repo.save(report);
 }
 
 async changeApproval(id:string,approved:boolean){
  const report = await this.repo.findOne({where:{id:parseInt(id)}})

  if(!report)
   throw new NotFoundException("Report Not Found")
  
  report.approved=approved;
  return this.repo.save(report)
 }

 getEstimate({make,model,lat,lng,year,mileage}:GetEstimateDto){
  return this.repo.createQueryBuilder()
  .select("AVG(price)","price")
  .where("make=:make",{make})
  .andWhere("model=:model",{model})
  .andWhere("lat -:lat BETWEEN -5 AND 5",{lat})
  .andWhere("lng -:lng BETWEEN -5 AND 5",{lng})
  .andWhere("year -:year BETWEEN -3 AND 3",{year})
  .andWhere("approved is TRUE")
  .orderBy('ABS(mileage - :mileage)','DESC')
  .setParameters({mileage})
  .limit(3)
  .getRawOne()
 }

}