// Load environment variables FIRST, before any other imports
import { config } from 'dotenv';
config();

// Now import other modules
import { sql } from 'drizzle-orm';
import { db } from '../../../lib/db';

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');

    const database = db();

    // Test 1: Simple query
    const result = await database.execute(sql`SELECT NOW() as current_time, version() as db_version`);
    console.log('✅ Database connection successful!');
    console.log('📅 Current time:', result[0].current_time);
    console.log('🗄️  Database version:', result[0].db_version);

    // Test 2: Check if users2 table exists
    const tableCheck = await database.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users2'
      ) as table_exists
    `);

    if (tableCheck[0].table_exists) {
      console.log('✅ Table "users2" exists');

      // Test 3: Count records in users2
      const countResult = await database.execute(sql`SELECT COUNT(*) as count FROM users2`);
      console.log(`📊 Number of records in users2: ${countResult[0].count}`);

      // Test 4: Fetch all users
      const users = await database.execute(sql`SELECT * FROM users2`);
      console.log('👥 Users in database:', users);
    } else {
      console.log('⚠️  Table "users2" does not exist yet');
    }

    console.log('\n✨ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();
