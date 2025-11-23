import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from 'drizzle-orm';
import { db } from '../../lib/db';

type ResponseData = {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const database = db();

    // Test 1: Simple query
    const result = await database.execute(
      sql`SELECT NOW() as current_time, version() as db_version`
    );

    // Test 2: Check if users2 table exists
    const tableCheck = await database.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users2'
      ) as table_exists
    `);

    const response: any = {
      success: true,
      message: 'Database connection successful',
      data: {
        currentTime: result[0].current_time,
        dbVersion: result[0].db_version,
        tableExists: tableCheck[0].table_exists,
      },
    };

    // Test 3: If table exists, fetch users
    if (tableCheck[0].table_exists) {
      const countResult = await database.execute(
        sql`SELECT COUNT(*) as count FROM users2`
      );
      const users = await database.execute(sql`SELECT * FROM users2`);

      response.data.userCount = countResult[0].count;
      response.data.users = users;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
