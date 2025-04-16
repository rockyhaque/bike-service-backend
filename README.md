# Bike Servicing Management System Backend

## Project Overview:

This backend project is designed to manage a bike servicing center's operations efficiently. It handles customer information, bike details, and service records using a relational database structure. The system allows admins or service staff to track service progress, manage customer profiles, and store service history for each bike.

## Live Backend Link ➡️ 


## Tech Stack

`Backend Framework:` Node.js + Express.js

`ORM:` Prisma

`Database:` PostgreSQL

`Deployment:` Render

## Setup Guide

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/bike-servicing-backend.git

   cd bike-servicing-backend

   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables Create a .env file in the root directory:

   ```bash
   DATABASE_URL=your_postgresql_url_here
   ```

4. Generate Prisma client

   ```bash
   npx prisma generate
   ```

5. Apply the schema & migrate DB

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the server

   ```bash
   npm run dev
   ```


## Key Features

- `Customer Management:` Add and manage customers with unique email and contact info.

- `Bike Tracking:` Link each bike to a specific customer and manage bike info.

- `Service Records:` Log service requests, including service and completion dates.

- `Service Status Tracking:` Easily update and check service status (pending, in_progress, done) via enum.

- `Timestamps:` Auto-generated createdAt and serviceDate for accurate tracking.

- `Relational Data Handling:` Prisma handles relations between customers, bikes, and service records smoothly.

- `Deployed & Ready:` Easily host the backend using platforms like Render or Railway.




## Schema Structure Summary

### Customer

- **Primary key**: `customerId` (UUID)
- **Fields**: `name`, `email`, `phone`, `createdAt`
- **Relation**:
  - One-to-many with Bike → `bikes` field

### Bike

- **Primary key**: `bikeId` (UUID)
- **Fields**: `brand`, `model`, `year`, `customerId`
- **Relation**:
  - Belongs to one Customer
  - One-to-many with ServiceRecord → `services` field

### ServiceRecord

- **Primary key**: `serviceId` (UUID)
- **Fields**: `serviceDate`, `completionDate`, `description`, `status`
- **Relation**:
  - Belongs to one Bike

### ServiceStatus

- **Enum**: `pending`, `in_progress`, `done`

## ✅ Features and Good Practices Used

### Database Design

- UUIDs as primary keys
- Enum for service status
- `@map()` for PostgreSQL snake_case compatibility

### Relations & Conventions

- Default timestamps
- Proper foreign key relations using `@relation(fields, references)`
- Clear one-to-many chain: `Customer → Bike → ServiceRecord`
