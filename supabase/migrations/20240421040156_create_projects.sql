CREATE TABLE
    projects (
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid (),
        profile_id UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
        project_name TEXT,
        project_url TEXT UNIQUE,
        repository_url TEXT UNIQUE,
        description TEXT,
        sort INT,
        created_at timestamptz DEFAULT now (),
        updated_at timestamptz
    );

CREATE INDEX ix_projects_profiles_id ON projects (profile_id);

-- Set up Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone." ON projects FOR
SELECT
    USING (TRUE);

CREATE POLICY "Users can insert their own projects." ON projects FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = profile_id
    );

CREATE POLICY "Users can update their own projects." ON projects FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);

CREATE POLICY "Users can delete their own projects." ON projects FOR DELETE USING (
    (
        SELECT
            auth.uid ()
    ) = profile_id
);

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_project_updated_at BEFORE
UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);