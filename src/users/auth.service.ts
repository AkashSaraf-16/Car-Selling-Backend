import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { UsersService } from "./users.service"
import { randomBytes,scrypt as _scrypt } from "node:crypto"
import { promisify } from "util"

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
 constructor(private userService:UsersService){}

 async signup(email:string, password:string){
  const users = await this.userService.find(email)
  if(users.length>0){
   throw new BadRequestException("Email already in use.")
  }

  // Generate a salt
  const salt = randomBytes(8).toString('hex')
  // Hash the password n salt
  const hash = (await scrypt(password,salt,32)) as Buffer;
  // Join the hash and salt togther with a separator
  const result = salt+'.'+hash.toString('hex')
  // Create the user with email and result
  const user = await this.userService.create(email,result)

  return user;
 }

 async signin(email:string,password:string){
  const [user] = await this.userService.find(email)
  if(!user)
  throw new NotFoundException("Your Email/password doesnt match.")

  const [salt,storedHash] = user.password.split('.')
  const hash = (await scrypt(password,salt,32)) as Buffer

  if(storedHash !== hash.toString('hex'))
   throw new NotFoundException("Your Email/password doesnt match.")
  return user
 }
}