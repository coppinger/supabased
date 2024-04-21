CREATE TABLE "supabase_products"(
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text,
    "sort" int
);

-- Set up RLS
ALTER TABLE supabase_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supabase products are viewable by everyone." ON supabase_products
    FOR SELECT
        USING (TRUE);

-- Create join table
CREATE TABLE "supabase_products_projects"(
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "supabase_product_id" uuid,
    "project_id" uuid
);

-- Add a foreign key to the table
ALTER TABLE "supabase_products_projects"
    ADD FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "supabase_products_projects"
    ADD FOREIGN KEY ("supabase_product_id") REFERENCES "supabase_products"("id");

-- Set up RLS for supabase_products_projects
-- Set up RLS
ALTER TABLE supabase_products_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supabase products projects are viewable by everyone." ON supabase_products_projects
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Profiles can insert into supabase_products_projects for their own projects" ON supabase_products_projects
    FOR INSERT
        WITH CHECK (auth.uid() =(
            SELECT
                profile_id
            FROM
                projects
            WHERE
                id = project_id));

CREATE POLICY "Profiles can update their own supabase_products_projects" ON supabase_products_projects
    FOR UPDATE
        USING (auth.uid() =(
            SELECT
                profile_id
            FROM
                projects
            WHERE
                id = project_id));

