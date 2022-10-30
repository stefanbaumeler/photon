export const onModifiedTrigger = (table: string) => {
    return `
        CREATE TRIGGER ${table}_date_modified
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE PROCEDURE on_modified_timestamp();
      `
}
