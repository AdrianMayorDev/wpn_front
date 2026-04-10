# WPN - Game Library Manager

A web application for managing your Steam game library. Sync your Steam games, organize them with custom statuses, and track your gaming progress.

Built as a final project for **FP Superior en Desarrollo de Aplicaciones Web**.

<!-- TODO: Add screenshot here -->
<!-- ![WPN Screenshot](./docs/screenshot.png) -->

## Features

- **Steam Integration** - Sync your Steam library automatically by entering your Steam username
- **Custom Statuses** - Create, edit, and delete custom game statuses (Playing, Completed, Backlog, etc.)
- **Game Tracking** - Assign statuses to games and track your progress across your library
- **User Authentication** - Secure login/signup with JWT-based authentication
- **Account Management** - Update credentials or delete your account from the settings panel

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | React 19 + CSS Modules |
| Auth | JWT (jwt-decode) |
| Backend | [WPN API](<!-- TODO: link to backend repo -->) (Express) |
| CI | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- The [WPN backend API](<!-- TODO: link to backend repo -->) running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/AMayor/wpn_front.git
cd wpn_front

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000` |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (pages)/            # Route group (login, signup)
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home / Dashboard
├── components/
│   ├── FilledButton/       # Reusable button component
│   ├── GameTable/          # Game library table with status management
│   ├── InputTextField/     # Reusable input component
│   ├── LoginComponent/     # Login compound component
│   ├── SettingsModal/      # User settings (account, statuses)
│   ├── SidePanel/          # User info sidebar
│   ├── SignupComponent/    # Signup compound component
│   └── Toast/              # Toast notification system
├── context/                # React Context (Library state)
├── hooks/                  # Custom hooks (auth, token, login)
├── layouts/                # Page layouts (Login, Signup)
├── services/               # API service layer
└── styles/                 # Global styles, theme, colors
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Add unit and integration tests (Jest + React Testing Library)
- [ ] Loading skeletons for better UX
- [ ] Responsive design improvements
- [ ] Dark/light theme toggle
- [ ] Game search and filtering

## Author

**Adrian Mayor** - [GitHub](https://github.com/AMayor)
