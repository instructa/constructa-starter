# Authentication Tests

This directory contains end-to-end tests for the authentication system.

## Running Tests

### Prerequisites

1. **Dev server must be running**: The integration tests make real HTTP requests to `http://localhost:3000`
   ```bash
   pnpm dev
   ```

2. **Database should be set up**: Make sure your PostgreSQL database is running and migrations are applied
   ```bash
   docker compose up -d db
   pnpm db:migrate
   ```

### Running the Tests

Run all authentication tests:
```bash
pnpm test:auth
```

Run tests in watch mode (useful during development):
```bash
pnpm test:auth:watch
```

Run all tests in the project:
```bash
pnpm test
```

## Test Coverage

The authentication tests cover:

- **Sign Up Flow**
  - Successful user registration
  - Email validation
  - Password strength validation
  - Duplicate email prevention

- **Email Verification**
  - Sending verification emails
  - Verifying email with valid token
  - Rejecting invalid tokens
  - Auto sign-in after verification

- **Sign In Flow**
  - Sign in with verified email
  - Blocking unverified emails
  - Password validation
  - Session creation

- **Session Management**
  - Creating sessions on sign-in
  - Getting current session
  - Sign out functionality

- **Password Reset**
  - Sending reset emails
  - Reset token validation

- **Email Provider Testing**
  - Testing email sending functionality
  - Provider switching (console, mailhog, smtp, resend)

## How Tests Work

1. **Email Mocking**: The tests mock the `sendEmail` function to capture emails instead of actually sending them
2. **Unique Test Users**: Each test uses a unique email address to avoid conflicts
3. **Real API Calls**: Tests make actual HTTP requests to the auth endpoints
4. **Session Testing**: Tests verify cookie-based session management

## Debugging Tests

If tests are failing:

1. **Check the dev server is running** at `http://localhost:3000`
2. **Check environment variables** - ensure `.env` is properly configured
3. **Check the console output** - the tests log captured emails
4. **Run individual tests** by using `.only`:
   ```typescript
   it.only("should verify email with valid token", async () => {
     // test code
   })
   ```

## Adding New Tests

When adding new auth features, add corresponding tests:

1. Create a new `describe` block for the feature
2. Test both success and failure cases
3. Mock external dependencies (like email sending)
4. Use unique test data to avoid conflicts 