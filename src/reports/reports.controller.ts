import { Controller,Post,Body,UseGuards,Patch,Param,Get,Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from "./reports.service"
import { CurrentUser } from "../users/decorators/current-user.decorator"
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
 constructor(private reportService:ReportsService){}
 @UseGuards(AuthGuard)
 @Post()
 createReport(@Body() body:createReportDto,@CurrentUser() user:User){
  return this.reportService.create(body,user);
 }

 @Patch("/:id")
 @UseGuards(AdminGuard)
 approveReport(@Param("id") id:string, @Body() body:ApproveReportDto){
  return this.reportService.changeApproval(id,body.approved);
 }

 @Get()
 getEstimate(@Query() query: GetEstimateDto){
  return this.reportService.getEstimate(query)
 }

}
