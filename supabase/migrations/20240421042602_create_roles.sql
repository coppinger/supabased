CREATE TABLE "roles"(
    "id" uuid PRIMARY KEY,
    "name" text,
    "sort" int
);

-- Set up RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roles are viewable by everyone." ON roles
    FOR SELECT
        USING (TRUE);

-- Create join table
CREATE TABLE "profiles_roles"(
    "id" uuid PRIMARY KEY,
    "profile_id" uuid,
    "role_id" uuid
);

-- Add a foreign key to the table
ALTER TABLE "profiles_roles"
    ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id");

ALTER TABLE "profiles_roles"
    ADD FOREIGN KEY ("role_id") REFERENCES "roles"("id");

-- Set up RLS
ALTER TABLE profiles_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile roles are viewable by everyone." ON profiles_roles
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Profiles can insert into profiles_roles for their own profile" ON profiles_roles
    FOR INSERT
        WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Profiles can update their own profiles_roles" ON profiles_roles
    FOR UPDATE
        USING (auth.uid() = profile_id);

