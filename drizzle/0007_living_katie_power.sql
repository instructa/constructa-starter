CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"email" text,
	"avatar" text,
	"phone" text,
	"firstName" text,
	"lastName" text,
	"fullName" text,
	"isOnboardingComplete" boolean DEFAULT false,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" text DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_exp" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;