import { createParamDecorator,ExecutionContext } from "@nestjs/common"
// decorators are not the part of DI part of nestjs hence we need to put 
// request.currentUser from interceptor i.e., we have used current-user interceptor
export const CurrentUser = createParamDecorator(
 (data: any, context:ExecutionContext)=>{
  const request = context.switchToHttp().getRequest()
  return request.currentUser
 }
 )