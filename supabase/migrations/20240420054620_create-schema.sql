-- Enable MODDATETIME extension
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TABLE "profiles"(
    "id" uuid PRIMARY KEY,
    "display_name" text,
    "skills" text,
    "bio" text,
    "twitter_username" text,
    "github_username" text,
    "location" text,
    "timezone" tz,
    "availibility" text,
    "pfp_url" text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

CREATE TABLE "projects"(
    "id" uuid PRIMARY KEY,
    "profile_id" uuid,
    "project_name" text,
    "project_url" text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

CREATE TABLE "endorsements"(
    "id" uuid PRIMARY KEY,
    "endoresement_to" uuid,
    "endorsed_by" uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

CREATE TABLE "stacks"(
    "id" uuid PRIMARY KEY,
    "name" text,
    "url" text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

CREATE TABLE "profiles_stacks"(
    "id" uuid PRIMARY KEY,
    "profile_id" uuid,
    "stack_id" uuid
);

CREATE TABLE "projects_stacks"(
    "id" uuid PRIMARY KEY,
    "project_id" uuid,
    "stack_id" uuid
);

CREATE TABLE "stacks_tags"(
    "id" uuid PRIMARY KEY,
    "stack_id" uuid,
    "tag_id" uuid
);

CREATE TABLE "tags"(
    "id" uuid PRIMARY KEY,
    "name" text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

CREATE TABLE "projects_tags"(
    "id" uuid,
    "tag_id" uuid,
    "project_id" uuid
);

CREATE TABLE "profiles_tags"(
    "id" uuid PRIMARY KEY,
    "tag_id" uuid,
    "profile_id" uuid
);

ALTER TABLE "profiles_stacks"
    ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id");

ALTER TABLE "profiles_stacks"
    ADD FOREIGN KEY ("stack_id") REFERENCES "stacks"("id");

ALTER TABLE "projects"
    ADD FOREIGN KEY ("id") REFERENCES "projects_stacks"("project_id");

ALTER TABLE "projects_stacks"
    ADD FOREIGN KEY ("stack_id") REFERENCES "stacks"("id");

ALTER TABLE "stacks_tags"
    ADD FOREIGN KEY ("stack_id") REFERENCES "stacks"("id");

ALTER TABLE "stacks_tags"
    ADD FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "projects_tags"
    ADD FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "projects_tags"
    ADD FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "profiles_tags"
    ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id");

ALTER TABLE "profiles_tags"
    ADD FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "projects"
    ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id");

ALTER TABLE "endorsements"
    ADD FOREIGN KEY ("endoresement_to") REFERENCES "profiles"("id");

ALTER TABLE "endorsements"
    ADD FOREIGN KEY ("endorsed_by") REFERENCES "profiles"("id");

-- Set up Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT
        WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE
        USING (auth.uid() = id);

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_profile_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime(updated_at);

---- When a new auth user is created by Supabase, create a profile for them
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
INSERT INTO storage.buckets(id, name)
    VALUES ('profile_pictures', 'profile_pictures');

-- Set up access controls for storage.
CREATE POLICY "Profile pictures are publicly accessible." ON storage.objects
    FOR SELECT
        USING (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can upload an a profile picture." ON storage.objects
    FOR INSERT
        WITH CHECK (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can update their own profile picture." ON storage.objects
    FOR UPDATE
        USING (auth.uid() = OWNER)
        WITH CHECK (bucket_id = 'profile_pictures');

-- Set up Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT
        WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE
        USING (auth.uid() = id);

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_profile_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime(updated_at);

---- When a new auth user is created by Supabase, create a profile for them
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
INSERT INTO storage.buckets(id, name)
    VALUES ('profile_pictures', 'profile_pictures');

-- Set up access controls for storage.
CREATE POLICY "Profile pictures are publicly accessible." ON storage.objects
    FOR SELECT
        USING (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can upload an a profile picture." ON storage.objects
    FOR INSERT
        WITH CHECK (bucket_id = 'profile_pictures');

CREATE POLICY "Anyone can update their own profile picture." ON storage.objects
    FOR UPDATE
        USING (auth.uid() = OWNER)
        WITH CHECK (bucket_id = 'profile_pictures');

