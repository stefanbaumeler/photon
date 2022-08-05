export const onModifiedTrigger = (table: string) => {
    return `
        CREATE TRIGGER ${table}_modified_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE PROCEDURE on_modified_timestamp();
      `
}
