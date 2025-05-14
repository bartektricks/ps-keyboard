# PS Keyboard

A platform to search for PlayStation games that support mouse and keyboard input (or one of them), and vote on whether they're actually playable with these peripherals.

## About

PS Keyboard helps PlayStation gamers find games that work well with mouse and keyboard setups. Users can:

- Search for games that support mouse, keyboard, or both
- Vote on how well these peripherals actually work in practice
- Share their experiences and setup recommendations
- Contribute to a community-driven database of compatible games

## Getting Started

### Prerequisites

- Node.js 20 or newer
- PostgreSQL database
- PlayStation Network SSO token (NPSSO)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# PlayStation Network SSO token for accessing PSN API
NPSSO=your_npsso_token_here

# PostgreSQL database connection string
DATABASE_URL=postgresql://username:password@localhost:5432/ps_keyboard
```

You can copy the `.env.example` file to get started.

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/` - Next.js application routes and components
- `components/` - Reusable UI components
- `db/` - Database schema and operations
- `lib/` - Utility functions and API clients
