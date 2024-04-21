CREATE TABLE "endorsements"(
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "endoresement_to" uuid,
    "endorsed_by" uuid,
    "created_at" timestamptz DEFAULT now(),
    "deleted_at" timestamptz
);

ALTER TABLE "endorsements"
    ADD FOREIGN KEY ("endoresement_to") REFERENCES "profiles"("id");

ALTER TABLE "endorsements"
    ADD FOREIGN KEY ("endorsed_by") REFERENCES "profiles"("id");

-- Set up RLS
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endorsements are viewable by everyone." ON endorsements
    FOR SELECT
        USING (TRUE);

CREATE POLICY "Profiles can insert into endorsements for their own profile" ON endorsements
    FOR INSERT
        WITH CHECK (auth.uid() = endorsed_by);

CREATE POLICY "Profiles can update their own endorsements" ON endorsements
    FOR UPDATE
        USING (auth.uid() = endorsed_by);

