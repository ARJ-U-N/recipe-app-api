import {pgTable , serial ,text ,timestamp , integer} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm";

export const favoritesTable= pgTable("favorits" ,{
    id:serial("id").primaryKey(),
    userId:text("user_Id").notNull(),
    recipyId:integer("recipy_id").notNull(),
    title:text("title").notNull(),
    image:text("image"),
    cookTime:text("cook_time"),
    servings:text("servings"),
    createdAt:text("created_at").default(sql`NOW()`),


})