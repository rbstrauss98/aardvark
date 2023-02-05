--
-- File generated with SQLiteStudio v3.4.3 on Wed Feb 1 09:41:26 2023
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: bug
DROP TABLE IF EXISTS bug;

CREATE TABLE IF NOT EXISTS bug (
    id          INTEGER PRIMARY KEY ASC AUTOINCREMENT
                        NOT NULL
                        UNIQUE,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    is_solution INTEGER NOT NULL
                        CHECK (is_solution IN (0, 1) ) 
                        DEFAULT (0),
    posted_time REAL    NOT NULL
                        DEFAULT (CURRENT_TIMESTAMP),
    image       BLOB
);


-- Table: comment
DROP TABLE IF EXISTS comment;

CREATE TABLE IF NOT EXISTS comment (
    id          INTEGER PRIMARY KEY ASC AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    bug_id      INTEGER REFERENCES bug (id) ON DELETE CASCADE
                                            ON UPDATE CASCADE
                        NOT NULL,
    text        TEXT    NOT NULL,
    is_solution INTEGER CHECK (is_solution IN (0, 1) ) 
                        NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
