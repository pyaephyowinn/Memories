# Memories - Real Estate Platform

A modern real estate platform to discover, buy, rent, or sell properties. Built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## Features

- Browse, search, and filter property listings
- User authentication and roles (Owner, Customer)
- Book appointments for property visits
- Manage property sales, rentals, and payments
- Responsive, modern UI with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [React 19](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (for auth, if configured)

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Memories
```

### 2. Install dependencies

This project uses [pnpm](https://pnpm.io/):

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Add any other required environment variables here
```

### 4. Set up the database

Run Prisma migrations to set up your PostgreSQL database:

```bash
pnpm exec prisma migrate deploy
# or for development
pnpm exec prisma migrate dev
```

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

### 5. Start the development server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## Folder Structure

- `app/` - Next.js app directory (pages, layouts, etc.)
- `components/` - Reusable UI components
- `services/` - Business logic and data access
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets
- `lib/` - Utility libraries (e.g., Prisma client)

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.

## License

MIT
