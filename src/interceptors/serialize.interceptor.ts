/* eslint-disable @typescript-eslint/ban-types */
import { NestInterceptor,ExecutionContext,CallHandler, UseInterceptors } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from  "rxjs/operators"
import { plainToClass } from "class-transformer"

interface ClassConstructor{
 new (...args: any[]): {}
}

export function Serialize(dto:ClassConstructor){
 return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
 constructor(private dto:ClassConstructor){}
 intercept(context: ExecutionContext, handler: CallHandler): Observable<any>{
  // Run something before the request is handled by the request handler
  console.log("I am running before the request handler",context)

  return handler.handle().pipe(
   map((data)=>{
    // Run something before the response is handled by the response handler
    console.log("I am running before the response handler",data)
    return plainToClass(this.dto,data,{
     excludeExtraneousValues:true
    })
   })
  )
 }
}