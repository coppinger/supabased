CREATE TABLE
    "availability_types" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT UNIQUE,
        "sort" INT
    );

ALTER TABLE availability_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile availability types are viewable by everyone." ON availability_types FOR
SELECT
    USING (TRUE);

CREATE TABLE
    "profile_availability_types" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid REFERENCES profiles (id),
        "availability_type_id" INT REFERENCES availability_types (id),
        CONSTRAINT profiles_availabilities UNIQUE (profile_id, availability_type_id)
    );

ALTER PUBLICATION supabase_realtime ADD TABLE profile_availability_types;

CREATE INDEX ix_profiles_availability_types_profile_id ON profile_availability_types (profile_id);

CREATE INDEX ix_profiles_availability_types_type_id ON profile_availability_types (availability_type_id);

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

CREATE POLICY "Profiles can delete their own profile_availability_types" ON profile_availability_types FOR DELETE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);