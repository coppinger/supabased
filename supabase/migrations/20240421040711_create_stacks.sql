CREATE TABLE
    "stacks" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" text,
        "url" text,
        "slug" text,
        -- CONSTRAINT can't be UNIQUE on just name since many tech might have the same name
        CONSTRAINT unique_name_url UNIQUE (name, url)
    );

-- Set up RLS for stacks
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stacks are viewable by everyone." ON stacks FOR
SELECT
    USING (TRUE);

CREATE TABLE
    "projects_stacks" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "project_id" uuid REFERENCES projects (id),
        "stack_id" uuid REFERENCES stacks (id),
        CONSTRAINT projects_stacks_unique UNIQUE (project_id, stack_id)
    );

CREATE INDEX ix_projects_stacks_project_id ON projects_stacks (project_id);

CREATE INDEX ix_projects_stacks_stack_id ON projects_stacks (stack_id);

-- Set up RLS for projects_stacks
ALTER TABLE projects_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project stacks are viewable by everyone." ON projects_stacks FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into projects_stacks for their own projects" ON projects_stacks FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = (
            SELECT
                profile_id
            FROM
                projects
            WHERE
                id = project_id
        )
    );

CREATE POLICY "Profiles can update their own projects_stacks" ON projects_stacks FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = (
        SELECT
            profile_id
        FROM
            projects
        WHERE
            id = project_id
    )
);