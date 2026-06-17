-- This is an empty migration.

ALTER TABLE users
ADD CONSTRAINT check_users_age
CHECK (age >= 10 AND age < 100);