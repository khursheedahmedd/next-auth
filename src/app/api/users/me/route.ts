import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel"
import { NextResponse, NextRequest } from "next/server"
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request);

    const user = await User.findById({_id: userId}).select("-password");

    return NextResponse.json({
        message: "User fetched successfully",
        data: user
    })
}