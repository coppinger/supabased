CREATE TABLE
    "endorsements" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "endorsement_to" uuid REFERENCES profiles (id),
        "endorsed_by" uuid REFERENCES profiles (id),
        "created_at" timestamptz DEFAULT now (),
        "deleted_at" timestamptz,
        CONSTRAINT unique_endorsement UNIQUE (endorsement_to, endorsed_by)
    );

ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

ALTER publication supabase_realtime ADD TABLE endorsements;

CREATE POLICY "Endorsements are viewable by everyone." ON endorsements FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into endorsements for their own profile" ON endorsements FOR INSERT
WITH
    CHECK (auth.uid () = endorsed_by);

CREATE POLICY "Profiles can update their own endorsements" ON endorsements FOR
UPDATE USING (auth.uid () = endorsed_by);