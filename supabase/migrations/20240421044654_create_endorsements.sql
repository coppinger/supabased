CREATE TABLE
    "endorsements" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        "endorsement_to" uuid REFERENCES profiles (id),
        "endorsed_by" uuid REFERENCES profiles (id),
        "created_at" timestamptz DEFAULT now (),
        "deleted_at" timestamptz,
        CONSTRAINT unique_endorsement UNIQUE (endorsement_to, endorsed_by)
    );

CREATE INDEX ix_endorsements_by_id ON endorsements (endorsed_by);

CREATE INDEX ix_endorsements_to_id ON endorsements (endorsement_to);

ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

ALTER publication supabase_realtime ADD TABLE endorsements;

CREATE POLICY "Endorsements are viewable by everyone." ON endorsements FOR
SELECT
    USING (TRUE);

CREATE POLICY "Profiles can insert into endorsements for their own profile" ON endorsements FOR INSERT
WITH
    CHECK (
        (
            SELECT
                auth.uid ()
        ) = endorsed_by
    );

CREATE POLICY "Profiles can update their own endorsements" ON endorsements FOR
UPDATE USING (
    (
        SELECT
            auth.uid ()
    ) = endorsed_by
);

CREATE POLICY "Profiles can delete their own endorsements" ON endorsements FOR DELETE USING (
    (
        SELECT
            auth.uid ()
    ) = endorsed_by
);