import { Knex } from 'knex'
import { defaults } from '../helpers'

const create = `
CREATE OR REPLACE FUNCTION on_modified_timestamp()
    RETURNS trigger AS $$
    BEGIN
        NEW.date_modified = ${defaults.now};
        RETURN NEW;
    END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION on_user_deleted_update_media_owner()
    RETURNS trigger AS $$
    BEGIN
        UPDATE media SET uploader = owner WHERE owner = OLD.id;
        RETURN NULL;
    END;
$$ language 'plpgsql';
`

const drop = 'DROP FUNCTION on_modified_timestamp'

export async function up (knex: Knex) {
    return knex.raw(create)
}

export async function down (knex: Knex) {
    return knex.raw(drop)
}

