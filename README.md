

## ✅ Schema Structure Summary

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