import { config } from 'dotenv';
config();

import { db } from './src/lib/db';
import { users } from './src/lib/schema';

async function insertTestUser() {
  try {
    const database = db();

    const [user] = await database
      .insert(users)
      .values({
        username: 'testuser',
        email: 'test@example.com',
        image: 'https://avatar.iran.liara.run/public',
        intro: 'Test user for blog posts',
      })
      .returning();

    console.log('✅ Test user created successfully!');
    console.log('User ID:', user.id);
    console.log('Username:', user.username);
    console.log('\nUse this ID in your blog form:');
    console.log(user.id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create test user:', error);
    process.exit(1);
  }
}

insertTestUser();
