
# News App

A full-stack application for browsing and bookmarking the latest news stories across multiple categories. Users can register, sign in, explore categorized news articles, bookmark favorites, and view them across the app.



## Getting Started

To get started, you'll need to clone the repository and install the dependencies. You'll also need to create copy the .env.example file to .env and fill in the necessary values. You'll also need to create a copy of the .env.example at for prisma at @/prisma/.env


## Installation

1. Clone the repository

```bash
  git clone https://github.com/MarkoT25/nytnews.git
  cd nytnews
```
2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file

4. Run prisma migration commands

## Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm run build
npm start
```
## Design

SSR-first Approach

The application embraces server-side rendering (SSR) for all key data to ensure fast initial loads, minimal layout shift, and full SEO benefits. Pages are fully rendered on the server and hydrated on the client for dynamic interactivity where needed.

Infinite Scroll with Observables

The "Latest News" section implements infinite scrolling using native Observables instead of a data-fetching library like TanStack Query. While TanStack Query is typically the go-to for managing server state.

Custom Auth with Server Actions

Authentication is fully custom-built using Next.js server actions, providing a lightweight, secure flow without relying on third-party libraries. All auth-related validation is handled using Zod, ensuring safe and predictable user input parsing at both client and server levels.

Email Verification

New users receive a verification link via email using Nodemailer. The email verification flow is fully integrated with the custom auth system and persists verification status in the database.
NOTE: I used Gmail as a sender!

Favoriting

Favoriting articles is handled via Next.js API routes. It uses optimistic UI updates to immediately reflect changes in the interface, while persisting the state in the backend database. Favorited articles are shown across all categories and are accessible through a dedicated Favorites view in the sidebar.

Sidebar UX

The sidebar automatically collapses on navigation, improving usability on smaller screens. This was a deliberate UX decision to avoid persistent UI clutter and create a cleaner, focused reading experience.

Ad Banner (Pin Prompt)

A dismissible banner at the top of the screen encourages users to pin the app or set it as a homepage. Its dismissed state is stored in localStorage to persist between visits.
