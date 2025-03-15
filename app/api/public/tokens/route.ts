import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Token from "@/models/Token";

export const dynamic = "force-dynamic"; // Ensures the API route runs dynamically

export async function GET(req:Request){
   try {
    await dbConnect();
    const {searchParams} = new URL(req.url);
    const template = searchParams.get("template");
    if(!template){
        return NextResponse.json({message:"template is required"},{status:401});
    }
    const data = await Token.findOne({
        $and:[
            {template},
            {status:"draft"}
        ]
    },
    {
        token:1,
    });
    if(!data){
        return NextResponse.json({message:"no data found"},{status:401});
    }
    return NextResponse.json({message:"data found",data},{status:200});
   } catch (error) {
    console.log(error);
    return NextResponse.json({message:"error"},{status:500});
   }
}
