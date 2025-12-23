# Rank-up

The premium engineering platform for mastering algorithms and data structures, built with Next.js and optimized for Vercel.

## Features
- 🔐 **Authentication:** GitHub & Google OAuth via NextAuth.js.
- 💻 **Workspace:** Professional IDE experience with Monaco Editor.
- 🚀 **Execution:** Real-time JavaScript code runner.
- 📊 **Leaderboard:** Track global rankings and problem-solving progress.
- 🌓 **Design:** Modern dark-themed UI using Tailwind CSS.

## Tech Stack
- **Framework:** Next.js 15+
- **Database:** Prisma + Vercel Postgres
- **Styling:** Tailwind CSS + Lucide Icons
- **Auth:** NextAuth.js

## Getting Started

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file with the following:
   ```env
   DATABASE_URL="your_postgres_url"
   NEXTAUTH_SECRET="your_secret"
   GITHUB_ID="your_github_id"
   GITHUB_SECRET="your_github_secret"
   GOOGLE_CLIENT_ID="your_google_id"
   GOOGLE_CLIENT_SECRET="your_google_secret"
   ```

3. **Database Setup:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## License
MIT