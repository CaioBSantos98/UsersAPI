ALTER TABLE users
ADD COLUMN active BOOLEAN;

UPDATE users
SET active = true;

ALTER TABLE users
ALTER COLUMN active SET NOT NULL;

