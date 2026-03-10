# 🎓 Campus GigBoard — Backend Engineering I (Eval 1)

A platform where college students can post, browse, and apply for campus gigs.

## Setup

```bash
cd backend
npm install
node server.js
```

Server runs at: http://localhost:3000

## Project Structure

```
backend/
├── server.js                  ← Entry point, all middleware registered here
├── package.json
│
├── routes/
│   ├── gigRoutes.js           ← All gig endpoints + router-level middleware
│   └── userRoutes.js          ← All user endpoints + router-level middleware
│
├── controllers/
│   ├── gigController.js       ← Gig logic, uses fs module, try/catch
│   └── userController.js      ← User logic, uses fs module, try/catch
│
├── middleware/
│   ├── logger.js              ← Application-level middleware (custom)
│   ├── authCheck.js           ← Router-level middleware (auth protection)
│   └── errorHandler.js        ← Error-handling middleware (4 args)
│
├── data/
│   ├── gigs.json              ← Dummy gig data (no DB needed)
│   └── users.json             ← Dummy user data
│
└── public/
    └── index.html             ← Static file served by express.static

```

## API Endpoints

### Gigs
| Method | Route                      | Auth | Description          |
|--------|----------------------------|------|----------------------|
| GET    | /api/gigs                  | No   | Get all gigs         |
| GET    | /api/gigs/:id              | No   | Get gig by ID        |
| GET    | /api/gigs/category/:type   | No   | Get gigs by category |
| POST   | /api/gigs                  | Yes  | Create a gig         |
| PUT    | /api/gigs/:id              | Yes  | Update a gig         |
| DELETE | /api/gigs/:id              | Yes  | Delete a gig         |

### Users
| Method | Route                      | Auth | Description             |
|--------|----------------------------|------|-------------------------|
| GET    | /api/users                 | No   | Get all users           |
| GET    | /api/users/:userId         | No   | Get user by ID          |
| GET    | /api/users/:userId/gigs    | No   | Get gigs by a user      |

### Other
| Method | Route        | Description     |
|--------|--------------|-----------------|
| GET    | /api/health  | Health check    |
| GET    | /            | Static HTML page|

## For Protected Routes (POST, PUT, DELETE)
Add this header in Postman:
```
Authorization: gigboard-token-123
```

## Middleware Used
1. express.json()          → Built-in: parse JSON body
2. express.urlencoded()    → Built-in: parse form data
3. morgan('dev')           → Third-party: HTTP request logger
4. cors()                  → Third-party: Cross-origin requests
5. logger.js               → Application-level: custom request logger
6. authCheck.js            → Router-level: protects POST/PUT/DELETE routes
7. errorHandler.js         → Error-handling: catches all errors (4 args)
