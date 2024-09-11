import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try{
        const token = req.cookies.get("token")?.value || "";

        // console.log(token)

       const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

    //    console.log(decodedToken)
       
       return decodedToken._id
    }
    catch(err: any){
       throw new Error(err.message)
    }
}