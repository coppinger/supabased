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
        "profile_id" uuid REFERENCES profiles (id),
        "availability_type_id" uuid REFERENCES availability_types (id)
    );

ALTER TABLE profile_availability_types ENABLE ROW LEVEL SECURITY;

-- Set up RLS
CREATE POLICY "Profile availability types are viewable by everyone." ON profile_availability_types FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into profile_availability_types for their own profile" ON profile_availability_types FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = profile_id
    );

CREATE POLICY "Profiles can update their own profile_availability_types" ON profile_availability_types FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);