import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel"
import { NextResponse, NextRequest } from "next/server"

connect();

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({_id: userId}).select("-password");

    // if(!user) {
    //     return NextResponse.json({message: "User not found"}, {status: 404})
    // }

    console.log(user)

    return NextResponse.json({
        message: "User fetched successfully",
        data: user
    })
}