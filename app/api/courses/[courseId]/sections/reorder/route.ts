import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (req: NextRequest,{params}:{params:{courseId:string}})=>{

    try {
        const {userId}=auth()
        if(!userId) return new Response("Not authorized", {status:401})
        
            const {list} =await req.json()

            const course =await db.course.findUnique({
                where:{
                    id:params.courseId,
                    instructorId:userId
                }
            })
            if(!course) return new NextResponse("Course not found", {status:404})

            for(let item of list){
                await db.section.update({
                    where:{
                        id:item.id
                    },
                    data:{
                        position:item.position
                    }
                })
            }
            return NextResponse.json("reorder sections successfully",{status:200})
    } catch (err) {
        console.log("[reorder_PUT",err);
        return new NextResponse("Internal error", {status:500})
    }
}