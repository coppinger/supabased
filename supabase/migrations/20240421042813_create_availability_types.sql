CREATE TABLE
    "availability_types" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" text,
        "sort" int
    );

ALTER TABLE availability_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile availability types are viewable by everyone." ON availability_types FOR
SELECT
    USING (TRUE);

CREATE TABLE
    "profile_availability_types" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid,
        "availability_type_id" uuid
    );

ALTER TABLE "profile_availability_types" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id");

ALTER TABLE "profile_availability_types" ADD FOREIGN KEY ("availability_type_id") REFERENCES "availability_types" ("id");

-- Set up RLS
ALTER TABLE profile_availability_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile availability types are viewable by everyone." ON profile_availability_types FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into profile_availability_types for their own profile" ON profile_availability_types FOR INSERT
WITH
    CHECK (auth.uid () = profile_id);

CREATE POLICY "Profiles can update their own profile_availability_types" ON profile_availability_types FOR
UPDATE USING (auth.uid () = profile_id);