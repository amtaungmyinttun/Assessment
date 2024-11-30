# GIC Assessment

This repository contains two projects for the GIC Assessment:  
1. **Backend** (`GIC.Server`)  
2. **Frontend** (`GIC.Client`)

---

## Backend: `GIC.Server`

### Prerequisites
- **.NET 8 SDK** installed on your system
- **SQL Server** for the database connection

### Setup Instructions
1. **Clone the repository**
2. **Update Connection String**
    - Open the `appsettings.json` file in the `GIC.Server` directory.
    - Locate the `ConnectionStrings` section and replace the default value with your database connection string.
3. **Run the Application**

### Key Features and Patterns
- **Entity Framework Core Code-First Migration**: Database migrations are handled using EF Core.
- **CQRS (Command Query Responsibility Segregation)**: Ensures separation of read and write operations.
- **Mediator Pattern**: Simplifies communication between components via Mediator.
- **Autofac**: Dependency Injection container for managing application services.

## Frontend: `GIC.Client`

### Prerequisites
- Node.js (v16+ recommended)
- Yarn package manager (if not installed globally)

### Setup Instructions
1. **Clone the repository**
2. **Set API Base URL**
   - Open the `.env.development` file in the `GIC.Client` directory (or create one if it doesn’t exist).
   - Add the following environment variable with the backend API base URL:
     ```
     REACT_APP_API_BASE_URL=<your-backend-api-base-url>
     ```
     
3. **Install Dependencies**
   If `Yarn` is not installed globally:
   ```
   npm install --global yarn
   ```
   
   Then, install project dependencies:
   ```
   yarn install
   ```
   
4. Run the Application
   ```
   yarn start
   ```

### Key Features and Patterns
- **React 18.3**: Used for building the frontend.
- **Ant Design**: UI components library for consistent and modern design.
- **Formik**: Simplifies form creation and validation.
- **Reusable Components**: Custom components are created to enhance reusability for common form field
