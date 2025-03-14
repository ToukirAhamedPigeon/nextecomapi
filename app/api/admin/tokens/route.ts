import { dbConnect } from "@/lib/dbConnect";
import token from "@/models/Token";
import { tokenValidationSchema } from "@/types/schemas";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    return Response.json({message:"connected"},{status:200});
}

export async function POST(req:Request){
    try {
        //connect db
        await dbConnect();
        //get request body
        const body = await req.json();
        // Server Side Validation
        const validateFields = tokenValidationSchema.safeParse(body);
        if(!validateFields.success){
            return Response.json({
                message:"validation error",
                errors:validateFields.error.flatten().fieldErrors
            },{status:200});
        }
        // save to db
        const data = await new token(body).save();
        return NextResponse.json({
            message:"token created successfully",
            data
        },{status:201});

    } catch (error) {
        return NextResponse.json({
            error
        },{status:500});
    }
}
