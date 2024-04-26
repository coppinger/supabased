CREATE TABLE
    "profiles" (
        "id" UUID PRIMARY KEY NOT NULL REFERENCES auth.users ON DELETE CASCADE,
        "display_name" TEXT,
        "email" VARCHAR UNIQUE NOT NULL,
        "username" varchar(32) UNIQUE,
        "skills" TEXT,
        "bio" TEXT,
        "twitter_username" TEXT UNIQUE,
        "github_username" TEXT UNIQUE,
        "website_url" TEXT,
        "linkedin_url" TEXT UNIQUE,
        "location" TEXT,
        "timezone" TEXT,
        "pfp_url" TEXT,
        "stacks" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "products" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "languages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "availabilities" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "created_at" timestamptz DEFAULT now (),
        "updated_at" timestamptz,
        "deleted_at" timestamptz
    );

-- Set up Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles 
FOR SELECT USING (TRUE); 

CREATE POLICY "Users can insert their own profile." ON profiles
FOR INSERT WITH CHECK ( (SELECT auth.uid()) = id );

CREATE POLICY "Users can update own profile." ON profiles 
FOR UPDATE USING ( (SELECT auth.uid()) = id );

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_profile_updated_at BEFORE
UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

-- When a new auth user is created by Supabase, create a profile for them
CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    AS $$
BEGIN
    INSERT INTO public.profiles(id, email, pfp_url, github_username)
    -- We can get the user metadata column values like this if we need them
    -- NEW.raw_user_meta_data->>'user_name', NEW.email, NEW.raw_user_meta_data->>'avatar_url'       
 VALUES(
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'avatar_url',         
    CASE 
        WHEN NEW.raw_user_meta_data->>'iss' = 'https://api.github.com' THEN NEW.raw_user_meta_data->>'user_name' 
        ELSE NULL
    END);
    RETURN new;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
-- Set up Storage bucket for user avatars
INSERT INTO
    storage.buckets (id, name, public)
VALUES
    ('profile_pictures', 'profile_pictures', TRUE) ON CONFLICT DO NOTHING;

-- Set the bucket to be publicly accessible
CREATE POLICY "Profile pictures are publicly accessible." ON storage.buckets FOR
SELECT
    USING (id = 'profile_pictures');

-- Set up access controls for storage.
CREATE POLICY "Profile pictures are publicly accessible." ON storage.objects FOR
SELECT
    USING (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can upload an a profile picture." ON storage.objects FOR INSERT
WITH
    CHECK (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can update their own profile picture." ON storage.objects FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = OWNER
)
WITH
    CHECK (bucket_id = 'profile_pictures');

-- CREATE POLICY "Anyone can delete their own profile picture." ON storage.objects
--     FOR DELETE
--         USING ((
--             SELECT
--                 auth.uid()) = OWNER)
--             WITH CHECK (bucket_id = 'profile_pictures');
