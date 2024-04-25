CREATE TABLE
    availabilities (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT UNIQUE,
        "sort" INT
    );

ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profile availability types are viewable by everyone." ON availabilities FOR
SELECT
    USING (TRUE);

CREATE TABLE
    profiles_availabilities (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" UUID REFERENCES profiles (id) ON DELETE CASCADE,
        "availability_id" INT REFERENCES availabilities (id),
        CONSTRAINT unique_profiles_availabilities UNIQUE (profile_id, availability_id)
    );

CREATE INDEX ix_profiles_availabilities_profile_id ON profiles_availabilities (profile_id);

CREATE INDEX ix_profiles_availabilities_type_id ON profiles_availabilities (availability_id);

ALTER TABLE profiles_availabilities ENABLE ROW LEVEL SECURITY;

-- Set up RLS
CREATE POLICY "Profile availability types are viewable by everyone." ON profiles_availabilities FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into profiles_availabilities for their own profile" ON profiles_availabilities FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = profile_id
    );

CREATE POLICY "Profiles can update their own profiles_availabilities" ON profiles_availabilities FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);

CREATE POLICY "Profiles can delete their own profiles_availabilities" ON profiles_availabilities FOR DELETE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);

-- Trigger function to update profiles when a row is inserted into projects_availabilities
CREATE OR REPLACE FUNCTION update_profile_availabilities_on_insert()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the availability name from the availabilities table
    WITH availability_name AS (
    SELECT name
    FROM availabilities 
    WHERE id = NEW.availability_id
    )

    -- Update the profiles table to add the availability name to the array
    UPDATE profiles
    SET availabilities = ARRAY(SELECT DISTINCT unnest(array_append(availabilities, (SELECT name FROM availability_name))))
    WHERE id = NEW.profile_id;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger to execute the function on insert
CREATE TRIGGER insert_profile_availabilities_trigger
AFTER INSERT ON profiles_availabilities
FOR EACH ROW
EXECUTE FUNCTION update_profile_availabilities_on_insert();


-- Trigger function to update profiles when a row is deleted from projects_availabilities
CREATE OR REPLACE FUNCTION update_profile_availabilities_on_delete()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the availability name from the availabilities table
    WITH availabilities_name AS (
    SELECT name 
    FROM availabilities 
    WHERE id = OLD.availability_id
    )

    -- Update the profiles table to remove the availability name from the array
    UPDATE profiles
    SET availabilities = array_remove(availabilities, (SELECT name FROM availabilities_name))
    WHERE id = OLD.profile_id;

    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_profile_availabilities_trigger
AFTER DELETE ON profiles_availabilities
FOR EACH ROW
EXECUTE FUNCTION update_profile_availabilities_on_delete();