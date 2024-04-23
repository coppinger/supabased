-- Make the display_name column of the profiles table not nullable
ALTER TABLE "profiles"
    ALTER COLUMN "display_name" SET NOT NULL;

