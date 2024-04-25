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
        "project_id" uuid REFERENCES projects (id) ON DELETE CASCADE,
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

CREATE VIEW
    stacks_count AS
SELECT
    name,
    COUNT(stack_id)
FROM
    stacks
    LEFT JOIN projects_stacks ON stacks.id = projects_stacks.stack_id
GROUP BY
    stacks.name
ORDER BY
    COUNT(stack_id) DESC;
    
-- Trigger function to update profiles when a row is inserted into projects_stacks
CREATE OR REPLACE FUNCTION update_profile_stacks_on_insert()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the stack name from the stacks table
    WITH stack_name AS (
    SELECT name
    FROM stacks 
    WHERE id = NEW.stack_id
    )

    -- Update the profiles table to add the stack name to the array
    UPDATE profiles
    SET stacks = ARRAY(SELECT DISTINCT unnest(array_append(stacks,(SELECT name FROM stack_name))))
    WHERE id = (
        SELECT profile_id FROM projects WHERE id = NEW.project_id
    );

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger to execute the function on insert
CREATE TRIGGER insert_profile_stacks_trigger
AFTER INSERT ON projects_stacks
FOR EACH ROW
EXECUTE FUNCTION update_profile_stacks_on_insert();


-- Trigger function to update profiles when a row is deleted from projects_stacks
CREATE OR REPLACE FUNCTION update_profile_stacks_on_delete()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the stack name from the stacks table
    WITH stack_name AS (
    SELECT name 
    FROM stacks 
    WHERE id = OLD.stack_id
    )


    -- Update the profiles table to remove the stack name from the array
    UPDATE profiles
    SET stacks = array_remove(stacks, (SELECT name FROM stack_name))
    WHERE id = (
        SELECT profile_id FROM projects WHERE id = OLD.project_id
    );

    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

-- Trigger to execute the function on delete
CREATE TRIGGER delete_profile_stacks_trigger
AFTER DELETE ON projects_stacks
FOR EACH ROW
EXECUTE FUNCTION update_profile_stacks_on_delete();
