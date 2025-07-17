---
inclusion: manual
---

# Database Operations Guidelines

This steering file provides guidance for database operations and can be manually included when working with database code.

## General Database Principles

- Follow the principle of least privilege for database access
- Use parameterized queries to prevent SQL injection
- Keep database transactions as short as possible
- Use connection pooling for better performance
- Implement proper error handling for database operations
- Log database errors but avoid exposing sensitive information

## ORM Usage

- Use TypeORM/Prisma/Sequelize (or project-specific ORM) for database operations
- Define clear entity models with proper relationships
- Use migrations for database schema changes
- Validate data before saving to the database
- Use transactions for operations that modify multiple records

## Query Optimization

- Write efficient queries that retrieve only needed data
- Use appropriate indexes for frequently queried fields
- Avoid N+1 query problems by using eager loading when appropriate
- Consider pagination for large result sets
- Use query caching when appropriate

## Example Database Operation

```typescript
// Example using Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserWithPosts(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to retrieve user data');
  } finally {
    await prisma.$disconnect();
  }
}
```

## Data Access Patterns

- Implement repository pattern to abstract database operations
- Use dependency injection for database services
- Keep business logic separate from data access code
- Consider using the Unit of Work pattern for complex operations

## Security Considerations

- Never store sensitive data in plain text
- Implement row-level security when needed
- Use database roles with appropriate permissions
- Regularly audit database access
- Implement proper backup and recovery procedures

## Documentation and Naming

- **Files**: Use explicit and self-explanatory filenames (e.g., `user_repository.ts`, `database_migrations.ts`)
- **Functions**: Name functions clearly to indicate their purpose (e.g., `getUserByEmail`, `createNewOrder`)
- **Variables**: Use descriptive names for database entities and fields
- Document complex queries with explanations of what they do and why
- Add comments explaining the reasoning behind specific database design decisions

```typescript
/**
 * Retrieves user orders with pagination and filtering
 * 
 * This function implements a complex query that:
 * 1. Joins users and orders tables
 * 2. Applies filters based on order status and date range
 * 3. Implements pagination for performance
 * 
 * We're using raw SQL here instead of the ORM because:
 * - The query requires complex joins not easily expressed in the ORM
 * - Performance testing showed 30% faster execution with this approach
 * 
 * @param {string} userId - The user ID to fetch orders for
 * @param {OrderFilters} filters - Filtering criteria
 * @param {PaginationOptions} pagination - Pagination options
 * @returns {Promise<PaginatedOrders>} - Paginated order results
 */
```

## Standard Libraries and Tools

- Utilize standard libraries and well-maintained packages
- For TypeScript/JavaScript:
  - Use date-fns or Luxon for date manipulation
  - Use zod or joi for validation
  - Use pg or mysql2 for direct database connections when needed
- For Python:
  - Follow PEP 8 style guidelines
  - Use SQLAlchemy or Django ORM
  - Use pydantic for data validation
- Avoid reinventing functionality that exists in standard libraries