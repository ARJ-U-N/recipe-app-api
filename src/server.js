import express from "express"
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";




const app= express();
const PORT=ENV.PORT || 5001
 if(ENV.NODE_ENV==="production") job.start();

app.use(express.json())


app.get("/api/health",(req,res)=>{
    res.status(200).json({success:true});
})

app.post("/api/favorits", async (req,res)=>{
try {
    const {userId,recipyId,title,image,cookTime,servings}=req.body
    if(!userId || !recipyId|| !title|| !image|| !cookTime|| !servings){
       return res.status(400).json({error:"error"})
    } 
     const newFavorite=await db.insert(favoritesTable).values({
        userId,
        recipyId,
        title,
        image,
        cookTime,
        servings
    }).returning();
    res.status(201).json(newFavorite[0])
} catch (error) {
    console.log("error adding",error)
    res.status(500).json({error:"something went wrong"})
}
})
app.delete("/api/favorits/:userId/:recipyId", async (req,res)=>{
try {
    const {userId,recipyId}=req.params
    await db.delete(favoritesTable).where(
       and(eq(favoritesTable.userId,userId),eq(favoritesTable.recipyId,parseInt(recipyId)))
    )
    res.status(200).json({message:"deleted succesfully"})
} catch (error) {
    console.log("error adding",error)
    res.status(500).json({error:"something went wrong"})
}
})
app.get("/api/favorits/:userId", async(req,res)=>{
    try {
        const {userId}=req.params
         const userFavorites= await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId))
         res.json(userFavorites)
    } catch (error) {
         console.log("error adding",error)
    res.status(500).json({error:"something went wrong"})
    }
})

app.listen(PORT,()=>{
    console.log("server started at port ",PORT)
})