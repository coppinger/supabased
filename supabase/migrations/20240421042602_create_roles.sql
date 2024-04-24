<<<<<<< HEAD
CREATE TABLE
    "roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" text,
        "sort" int
    );

-- Set up RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roles are viewable by everyone." ON roles FOR
SELECT
    USING (TRUE);

-- Create join table
CREATE TABLE
    "profiles_roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid REFERENCES profiles (id),
        "role_id" uuid REFERENCES roles (id)
    );

-- Set up RLS
ALTER TABLE profiles_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile roles are viewable by everyone." ON profiles_roles FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into profiles_roles for their own profile" ON profiles_roles FOR INSERT
WITH
    CHECK (auth.uid () = profile_id);

CREATE POLICY "Profiles can update their own profiles_roles" ON profiles_roles FOR
UPDATE USING (auth.uid () = profile_id);
=======
CREATE TABLE
    "roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" text,
        "sort" int
    );

-- Set up RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roles are viewable by everyone." ON roles FOR
SELECT
    USING (TRUE);

-- Create join table
CREATE TABLE
    "profiles_roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid REFERENCES profiles (id),
        "role_id" uuid REFERENCES roles (id)
    );

CREATE INDEX ix_profiles_roles_profile_id ON profiles_roles (profile_id);

CREATE INDEX ix_profiles_roles_role_id ON profiles_roles (role_id);

-- Set up RLS
ALTER TABLE profiles_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile roles are viewable by everyone." ON profiles_roles FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into profiles_roles for their own profile" ON profiles_roles FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = profile_id
    );

CREATE POLICY "Profiles can update their own profiles_roles" ON profiles_roles FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);
>>>>>>> master
