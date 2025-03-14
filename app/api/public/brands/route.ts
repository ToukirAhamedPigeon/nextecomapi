import { dbConnect } from "@/lib/dbConnect";
import Brand from "@/models/Brand";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
        await dbConnect();
        const {searchParams} = new URL(req.url);
        const _id = searchParams.get("_id");
        if(!_id){
            const brands = await Brand.find();
            return NextResponse.json({message:"brands fetched",brands},{status:200});
        }
        else{
            if(!isValidObjectId(_id)){
                return NextResponse.json({message:"_id is not valid"},{status:400});
            }
            const brand = await Brand.findById(_id);
            if(!brand){
                return NextResponse.json({message:"brand not found"},{status:404});
            }
            if(brand){
                return NextResponse.json({message:"brand found",brand},{status:200});
            }
        }
    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500});
    }
}   
