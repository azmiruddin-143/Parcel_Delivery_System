import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { envVars } from "../config/env";


  export const crateToken = (user: Partial<IUser>) =>{
        const jsonPaylod = {
          userId: user._id,
          userEmail: user.email,
          userRole: user.role
        }
      
      
        const accesToken = jwt.sign(jsonPaylod, envVars.JWT_ACCESS_SECRET, { expiresIn: envVars.JWT_REFRESH_EXPIRES } as SignOptions
        );
      
       
     return{
        accesToken,
     
     }

   }