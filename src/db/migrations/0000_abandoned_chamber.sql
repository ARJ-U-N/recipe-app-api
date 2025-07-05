CREATE TABLE "favorits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_Id" text NOT NULL,
	"recipy_id" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cook_time" text,
	"servings" text,
	"created_at" text DEFAULT NOW()
);
