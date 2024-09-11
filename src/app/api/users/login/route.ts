import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextResponse, NextRequest, userAgent } from "next/server" 
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userInfo } from "os"

connect();

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({message: "Invalid credentials"}, {status: 400})
        }

        console.log("User exists");

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({message: "Invalid credentials"}, {status: 400})
        }

        const tokenData ={
            _id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    }
    catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}