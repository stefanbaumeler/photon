import { Knex } from 'knex'
import { defaults } from '../helpers'

const ON_MODIFIED_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_modified_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.modified_at = ${defaults.now};
    RETURN NEW;
  END;
$$ language 'plpgsql';
`

const DROP_ON_MODIFIED_TIMESTAMP_FUNCTION = 'DROP FUNCTION on_modified_timestamp'

export async function up (knex: Knex) {
    return knex.raw(ON_MODIFIED_TIMESTAMP_FUNCTION)
}

export async function down (knex: Knex) {
    return knex.raw(DROP_ON_MODIFIED_TIMESTAMP_FUNCTION)
}

