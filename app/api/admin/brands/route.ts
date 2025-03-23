import { dbConnect } from "@/lib/dbConnect";
import Brand from "@/models/Brand";
import { brandValidationSchema } from "@/types/schemas";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures the API route runs dynamically


// route.ts

/**
 * @swagger
 * /api/admin/brands:
 *   post:
 *     summary: Creates a new brand
 *     description: Creates a new brand with the provided details.
 *     tags:
 *       - Brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 description: The name of the brand.
 *                 example: "nike"
 *               description:
 *                 type: string
 *                 maxLength: 255
 *                 description: A short description of the brand.
 *                 example: "Sportswear brand"
 *               slug:
 *                 type: string
 *                 maxLength: 255
 *                 description: A unique slug for the brand.
 *                 example: "nike"
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: URL of the brand's logo or image.
 *                 example: "https://example.com/image.jpg"
 *               status:
 *                 type: string
 *                 enum:
 *                   - draft
 *                   - publish
 *                   - archive
 *                 description: The current status of the brand.
 *                 example: "publish"
 *               user_id:
 *                 type: string
 *                 description: The ID of the user creating the brand.
 *                 example: "609e127c8e4e3b4567f9e02b"
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
 *                   example: "brand created"
 *       400:
 *         description: Invalid fields in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "invalid fields"
 *                 errors:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Name is required"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "error"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
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
 *               properties:
 *                 status:
 *                   type: string
 *                   example: draft
 *                 createdAt:
 *                   type: string
 *                   example: 2021-01-01
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
