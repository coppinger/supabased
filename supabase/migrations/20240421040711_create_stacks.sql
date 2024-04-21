CREATE TABLE "stacks"(
    "id" uuid PRIMARY KEY,
    "name" text,
    "url" text,
    "slug" text
);

-- Set up RLS for stacks
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stacks are viewable by everyone." ON stacks
    FOR SELECT
        USING (TRUE);

CREATE TABLE "projects_stacks"(
    "id" uuid PRIMARY KEY,
    "project_id" uuid,
    "stack_id" uuid
);

-- Add a foreign key to the projects table
ALTER TABLE "projects_stacks"
    ADD FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "projects_stacks"
    ADD FOREIGN KEY ("stack_id") REFERENCES "stacks"("id");

-- Set up RLS for projects_stacks
ALTER TABLE projects_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project stacks are viewable by everyone." ON projects_stacks
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Profiles can insert into projects_stacks for their own projects" ON projects_stacks
    FOR INSERT
        WITH CHECK (auth.uid() =(
            SELECT
                profile_id
            FROM
                projects
            WHERE
                id = project_id));

CREATE POLICY "Profiles can update their own projects_stacks" ON projects_stacks
    FOR UPDATE
        USING (auth.uid() =(
            SELECT
                profile_id
            FROM
                projects
            WHERE
                id = project_id));

