<<<<<<< HEAD
CREATE TABLE
    "projects" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid REFERENCES profiles (id),
        "project_name" text,
        "project_url" text,
        "repository_url" text,
        "description" text,
        "created_at" timestamptz DEFAULT now (),
        "updated_at" timestamptz,
        "deleted_at" timestamptz
    );

-- Set up Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone." ON projects FOR
SELECT
    USING (TRUE);

CREATE POLICY "Users can insert their own projects." ON projects FOR INSERT
WITH
    CHECK (auth.uid () = profile_id);

CREATE POLICY "Users can update their own projects." ON projects FOR
UPDATE USING (auth.uid () = profile_id);

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_project_updated_at BEFORE
=======
CREATE TABLE
    "projects" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "profile_id" uuid REFERENCES profiles (id),
        "project_name" text,
        "project_url" text,
        "repository_url" text,
        "description" text,
        "created_at" timestamptz DEFAULT now (),
        "updated_at" timestamptz,
        "deleted_at" timestamptz
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

-- Set up Triggers
---- Set the `updated_at` column on every update
CREATE TRIGGER handle_project_updated_at BEFORE
>>>>>>> master
UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);