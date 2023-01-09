export const onModifiedTrigger = (table: string) => {
    return `
        CREATE TRIGGER ${table}_date_modified
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE PROCEDURE on_modified_timestamp();
      `
}

export const onUserDeletedUpdateMediaOwner = () => {
    return `
        CREATE TRIGGER user_deleted_update_media_owner
        BEFORE DELETE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE on_user_deleted_update_media_owner();
      `
}
