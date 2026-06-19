import { test, expect } from '@playwright/test';
import { connection } from '../db/dbConnection';

test('Read session from MySQL database', async () => {

  const [rows]: any = await connection.query(
    'SELECT * FROM user_sessions'
  );

  console.log(rows);

  expect(rows.length).toBeGreaterThan(0);

});