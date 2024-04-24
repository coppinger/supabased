CREATE TABLE "profiles"(
    "id" uuid PRIMARY KEY,
    "display_name" text,
    "username" varchar(32) UNIQUE,
    "skills" text,
    "bio" text,
    "twitter_username" text,
    "github_username" text,
    "website_url" text,
    "linkedin_url" text,
    "location" text,
    "timezone" text,
    "pfp_url" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz
);

-- Set up Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT
        WITH CHECK ((
            SELECT
                auth.uid()) = id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE
        USING ((
            SELECT
                auth.uid()) = id);

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_profile_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime(updated_at);

-- When a new auth user is created by Supabase, create a profile for them
CREATE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    AS $$
BEGIN
    INSERT INTO public.profiles(id)
        VALUES(NEW.id);
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
INSERT INTO storage.buckets(id, name, public)
    VALUES ('profile_pictures', 'profile_pictures', TRUE)
    ON CONFLICT DO NOTHING;

-- Set the bucket to be publicly accessible
CREATE POLICY "Profile pictures are publicly accessible." ON storage.buckets
    FOR SELECT
        USING (id = 'profile_pictures');

-- Set up access controls for storage.
CREATE POLICY "Profile pictures are publicly accessible." ON storage.objects
    FOR SELECT
        USING (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can upload an a profile picture." ON storage.objects
    FOR INSERT
        WITH CHECK (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can update their own profile picture." ON storage.objects
    FOR UPDATE
        USING ((
            SELECT
                auth.uid()) = OWNER)
            WITH CHECK (bucket_id = 'profile_pictures');

