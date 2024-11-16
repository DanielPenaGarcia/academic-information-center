export const beforeInsertUser = async (dataSource) => {
  const isTriggerExist = await dataSource.query(`
    SELECT * FROM information_schema.triggers
    WHERE trigger_name = 'before_insert_user' AND event_object_table = 'users';
  `);

  if (isTriggerExist.length) {
    return;
  }

  await dataSource.query(`
    CREATE TRIGGER before_insert_user
    BEFORE INSERT ON users
    FOR EACH ROW
    BEGIN
        DECLARE row_count INT;
        SELECT COUNT(*) + 1 INTO row_count FROM users;
        SET NEW.academic_id = LPAD(row_count, 11, '0');
    END;
  `);
};
