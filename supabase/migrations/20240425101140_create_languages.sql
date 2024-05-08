CREATE TABLE
    languages (
        id SERIAL PRIMARY KEY NOT NULL,
        name TEXT NOT NULL UNIQUE
    );

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public languages are viewable by everyone." ON languages FOR
SELECT
    USING (TRUE);

CREATE TABLE projects_languages (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid (),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id),
    CONSTRAINT unique_project_language UNIQUE (project_id, language_id)
);

CREATE INDEX ix_projects_languages_project_id ON projects_languages(project_id);
CREATE INDEX ix_projects_languages_language_id ON projects_languages(language_id);

ALTER TABLE projects_languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public languages are viewable by everyone." ON projects_languages FOR
SELECT
    USING (TRUE);


CREATE POLICY "Profiles can insert into projects_languages for their own projects" ON projects_languages FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = (
            SELECT
                p.profile_id
            FROM
                projects p
            WHERE
                id = project_id
        )
    );
CREATE POLICY "Profiles can update projects_languages for their own projects" ON projects_languages FOR UPDATE
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = (
            SELECT
                p.profile_id
            FROM
                projects p
            WHERE
                id = project_id
        )
    );
CREATE POLICY "Profiles can delete projects_languages for their own projects" ON projects_languages FOR DELETE
USING ( ( SELECT auth.uid () ) = ( SELECT p.profile_id FROM projects p WHERE id = project_id ) );

-- Trigger function to update profiles when a row is inserted into projects_languages
CREATE OR REPLACE FUNCTION update_profile_languages_on_insert()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the language name from the languages table
    WITH language_name AS (
    SELECT name
    FROM languages 
    WHERE id = NEW.language_id
    )

    -- Update the profiles table to add the language name to the array
    UPDATE profiles
    SET languages = ARRAY(SELECT DISTINCT unnest(array_append(languages, (SELECT name FROM language_name))))
    WHERE id = ( SELECT auth.uid() );

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger to execute the function on insert
CREATE TRIGGER insert_profile_languages_trigger
AFTER INSERT ON projects_languages
FOR EACH ROW
EXECUTE FUNCTION update_profile_languages_on_insert();


-- Trigger function to update profiles when a row is deleted from projects_languages
CREATE OR REPLACE FUNCTION update_profile_languages_on_delete()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the language name from the languages table
    WITH languages_name AS (
    SELECT name 
    FROM languages 
    WHERE id = OLD.language_id
    )

    -- Update the profiles table to remove the language name from the array
    UPDATE profiles
    SET languages = array_remove(languages, (SELECT name FROM languages_name))
    WHERE id = ( SELECT auth.uid() );

    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_profile_languages_trigger
AFTER DELETE ON projects_languages
FOR EACH ROW
EXECUTE FUNCTION update_profile_languages_on_delete();
