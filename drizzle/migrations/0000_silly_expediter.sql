CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"content" text NOT NULL,
	"avatar" text,
	"date" timestamp DEFAULT now() NOT NULL
);
