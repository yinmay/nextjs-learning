# Next.js Learning Project

A [Next.js](https://nextjs.org) learning project with PostgreSQL database integration using Drizzle ORM.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Pages Router)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DB_URL=your_postgresql_connection_string
```

### 3. Run Database Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `username`: Text (Unique)
- `email`: Text (Unique)
- `image`: Text (Optional)
- `intro`: Text (Optional)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Blog Table
- `id`: UUID (Primary Key)
- `title`: Text
- `content`: Text
- `thumbup`: Integer (Default: 0)
- `userId`: UUID (Foreign Key → users.id)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## API Routes

### Test Database Connection
- **GET** `/api/test-db` - Test database connection and view table info

### Users
- **POST** `/api/users` - Create test users

### Blog
- **API routes** available in `/api/blog`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
