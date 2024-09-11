import {connect} from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest, userAgent } from "next/server" 

connect();

export async function GET(request: NextRequest) {
    try{
        const response = NextResponse.json({message: "Logged out successfully", success: true}, {status: 200})

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    }
    catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}
