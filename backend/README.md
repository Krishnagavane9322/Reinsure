# Reinsure Services Backend

MERN stack backend for the Reinsure Services insurance website.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)

## MongoDB Setup

### Option 1: Install MongoDB Locally

**Windows:**

1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```

**Alternative: Use MongoDB Atlas (Cloud)**

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/reinsure
   ```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/reinsure
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```

## Running the Backend

### 1. Seed the Database

```bash
npm run seed
```

This will populate the database with initial data for services, testimonials, and FAQs.

### 2. Start Development Server

```bash
npm run dev
```

The server will start on http://localhost:5000

### 3. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Quotes

- `POST /api/quotes` - Submit a quote request
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get single quote
- `PATCH /api/quotes/:id` - Update quote status

### Services

- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Testimonials

- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### FAQs

- `GET /api/faqs` - Get all active FAQs
- `GET /api/faqs/:id` - Get single FAQ
- `POST /api/faqs` - Create FAQ
- `PUT /api/faqs/:id` - Update FAQ
- `DELETE /api/faqs/:id` - Delete FAQ

### Health Check

- `GET /api/health` - Server health check

## Testing the API

You can test the API using:

- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example:

```bash
curl http://localhost:5000/api/health
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── models/
│   │   ├── Quote.ts              # Quote model
│   │   ├── Service.ts            # Service model
│   │   ├── Testimonial.ts        # Testimonial model
│   │   └── FAQ.ts                # FAQ model
│   ├── controllers/
│   │   ├── quotes.controller.ts
│   │   ├── services.controller.ts
│   │   ├── testimonials.controller.ts
│   │   └── faqs.controller.ts
│   ├── routes/
│   │   ├── quotes.routes.ts
│   │   ├── services.routes.ts
│   │   ├── testimonials.routes.ts
│   │   └── faqs.routes.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── utils/
│   │   └── seed.ts               # Database seeding script
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── nodemon.json
```
