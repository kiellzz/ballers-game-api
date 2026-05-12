# Ballers Game API
REST API for user authentication, player management and match tracking, built with Node.js, TypeScript, Express, Prisma and PostgreSQL.

![Tests](https://github.com/kiellzz/ballers-game-api/actions/workflows/tests.yml/badge.svg)

## Live
> **[▶ https://ballers-game-api.onrender.com](https://ballers-game-api.onrender.com)**

Deployed on **Render** with **Neon** PostgreSQL

## Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL

### Installation
```bash
git clone https://github.com/kiellzz/ballers-game-api.git
cd ballers-game-api
npm install
```

### Environment Variables
Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ballers_game"
JWT_SECRET="your_secret_here"
```

### Database Setup
```bash
npx prisma migrate dev
```

### Running
```bash
npm run dev
```

### Tests
```bash
npm test
```

## Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

> All routes below require `Authorization: Bearer <token>` header.

### Players
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | List user's players |
| POST | `/api/players` | Add player to user's squad |
| DELETE | `/api/players/:playerId` | Remove player from squad |

### Matches
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/matches` | Record a match with player stats |
| GET | `/api/matches` | List user's matches |
| GET | `/api/matches/:id` | Get match details |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get aggregated user stats |

## Match Player Stats

When recording a match, each player entry supports:

| Field | Type | Description |
|-------|------|-------------|
| `goals` | number | Goals scored |
| `assists` | number | Assists provided |
| `cleanSheet` | boolean | Clean sheet kept |
| `yellowCards` | number | Yellow cards (0–2) |
| `redCard` | boolean | Red card received |
| `rating` | number | Match rating |
| `isMVP` | boolean | MVP of the match |
