import { dbConnect } from "@/lib/dbConnect";
import Brand from "@/models/Brand";
import { brandValidationSchema } from "@/types/schemas";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures the API route runs dynamically

//create brand

/**
 * @swagger
 * /api/admin/brands:
 *   post:
 *     summary: Creates a new brand
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: brand created
 */
export async function POST(req:Request){
    try {
        await dbConnect();
        const body = await req.json();
        const validateFields = brandValidationSchema.safeParse(body);
        if(!validateFields.success){
            return NextResponse.json({message:"invalid fields",errors:validateFields.error.flatten().fieldErrors},{status:400});
        }
        const brand = await Brand.create(body);
        return NextResponse.json({message:"brand created",brand},{status:200});
    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500});
    }
}
//update brand

/**
 * @swagger
 * /api/admin/brands:
 *   put:
 *     summary: Updates a brand
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: brand updated
 */
export async function PUT(req:Request){
    try {
        await dbConnect();
        const {searchParams} = new URL(req.url);
        const _id = searchParams.get("_id");
        if(!_id || !isValidObjectId(_id)){
            return NextResponse.json({message:"_id is required"},{status:400});
        }
        const body = await req.json();
        const validateFields = brandValidationSchema.safeParse(body);
        if(!validateFields.success){
            return NextResponse.json({message:"invalid fields",errors:validateFields.error.flatten().fieldErrors},{status:400});
        }
        const brand = await Brand.findByIdAndUpdate(_id,body,{new:true});  
        return NextResponse.json({message:"brand updated",brand},{status:200});
    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500});
    }
}

//delete brand

/**
 * @swagger
 * /api/admin/brands:
 *   delete:
 *     summary: Deletes a brand
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:        
 *                 message:
 *                   type: string
 *                   example: brand deleted
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: brand deleted
 *               type: object
                        status: "draft" | "publish" | "archive";
                        createdAt: Date;
                        };
 *               properties:
 *                 message:
 *                   type: string
 *                   example: brand deleted
 */
export async function DELETE(req:Request){
    try {
        await dbConnect();
        const {searchParams} = new URL(req.url);
        const _id = searchParams.get("_id");
        if(!_id || !isValidObjectId(_id)){
            return NextResponse.json({message:"_id is required"},{status:400});
        }
        const brand = await Brand.findByIdAndDelete(_id);
        return NextResponse.json({message:"brand deleted",brand},{status:200});
    } catch (error) {
        return NextResponse.json({message:"error",error},{status:500});
    }
}  
