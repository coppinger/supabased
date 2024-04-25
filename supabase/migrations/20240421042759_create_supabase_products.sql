CREATE TABLE products ("id" SERIAL PRIMARY KEY, "name" TEXT, "sort" INT);

-- Set up RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supabase products are viewable by everyone." ON products FOR
SELECT
    USING (TRUE);

-- Create join table
CREATE TABLE projects_products (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "project_id" uuid REFERENCES projects (id) ON DELETE CASCADE,
        "product_id" INT REFERENCES products (id),
        CONSTRAINT unique_projects_products UNIQUE (project_id, product_id)
    );

CREATE INDEX ix_projects_products_project_id ON projects_products (project_id);
CREATE INDEX ix_projects_products_product_id ON projects_products (product_id);

-- Set up RLS
ALTER TABLE projects_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supabase products projects are viewable by everyone." ON projects_products FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into products_projects for their own projects" ON projects_products FOR INSERT
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

CREATE POLICY "Profiles can update their own supabase_products_projects" ON projects_products FOR
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

CREATE POLICY "Profiles can delete their own supabase_products_projects" ON projects_products FOR DELETE USING (
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

-- Trigger function to update profiles when a row is inserted into projects_products
CREATE OR REPLACE FUNCTION update_profile_products_on_insert()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the product name from the products table
    WITH product_name AS (
    SELECT name
    FROM products 
    WHERE id = NEW.product_id
    )

    -- Update the profiles table to add the product name to the array
    UPDATE profiles
    SET products = ARRAY(SELECT DISTINCT unnest(array_append(products, (SELECT name FROM product_name))))
    WHERE id = (
        SELECT profile_id FROM projects WHERE id = NEW.project_id
    );

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger to execute the function on insert
CREATE TRIGGER insert_profile_products_trigger
AFTER INSERT ON projects_products
FOR EACH ROW
EXECUTE FUNCTION update_profile_products_on_insert();


-- Trigger function to update profiles when a row is deleted from projects_products
CREATE OR REPLACE FUNCTION update_profile_products_on_delete()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Get the product name from the products table
    WITH products_name AS (
    SELECT name 
    FROM products 
    WHERE id = OLD.product_id
    )


    -- Update the profiles table to remove the product name from the array
    UPDATE profiles
    SET products = array_remove(products, (SELECT name FROM products_name))
    WHERE id = (
        SELECT profile_id FROM projects WHERE id = OLD.project_id
    );

    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_profile_products_trigger
AFTER DELETE ON projects_products
FOR EACH ROW
EXECUTE FUNCTION update_profile_products_on_delete();