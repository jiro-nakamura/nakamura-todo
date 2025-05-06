# Nakamura Todo App

This is a full-stack Todo application built with **Laravel** (backend) and **React** (frontend), integrated with a MySQL database using Laravel Sail (Docker). Developed as part of my transition from an SIER dispatch role to a Web Engineer, this project showcases my ability to build secure RESTful APIs, create dynamic frontends, troubleshoot complex issues, and work with modern development environments.

## Features

- **User Authentication** (Laravel Sanctum):
  - Register new users with name, email, and password.
  - Login and logout with secure token-based authentication.
  - CSRF protection for SPA (Single Page Application) security.
- **Todo Management** (RESTful API):
  - `GET /api/todos`: Retrieve all todos for the authenticated user.
  - `POST /api/todos`: Create a new todo with title, due date, and description.
  - `PUT /api/todos/{id}`: Update an existing todo.
  - `DELETE /api/todos/{id}`: Delete a todo.
- **Frontend** (React):
  - Dynamic UI for user registration, login, and todo management.
  - Japanese date formatting (e.g., `2025年05月06日14時30分22秒`).
  - Client-side validation and user-friendly error messages (success: green, error: red).
- **Validation**:
  - Backend: Ensures title, due date, and user input meet requirements.
  - Frontend: Prevents empty submissions with clear feedback.
- **Database**:
  - MySQL with Eloquent ORM for managing `users` and `todos` tables.
  - User-specific todos via `user_id` foreign key.
- **Environment**:
  - Laravel Sail (Docker) for consistent development and deployment.

## Tech Stack

- **Backend**: Laravel 12.x, PHP 8.x
- **Frontend**: React 18.x, Vite (build tool)
- **Database**: MySQL 8.0.x
- **Authentication**: Laravel Sanctum
- **Environment**: Laravel Sail, Docker
- **Libraries**:
  - Backend: Eloquent ORM, Laravel Sanctum
  - Frontend: Axios (HTTP requests), date-fns (date formatting)
- **Testing**: Postman for API testing, browser for frontend testing
- **Future Plan**: Deploy to AWS (Elastic Beanstalk), enhance UI with Tailwind CSS

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone git@github.com:jiro-nakamura/nakamura-todo.git
   cd nakamura-todo
   ```

2. **Install backend dependencies**:
   ```bash
   composer install
   ```

3. **Install frontend dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Configure `.env` with database settings (default for Sail):
     ```
     DB_CONNECTION=mysql
     DB_HOST=mysql
     DB_PORT=3306
     DB_DATABASE=myapp
     DB_USERNAME=sail
     DB_PASSWORD=password
     ```

5. **Generate application key**:
   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

6. **Run migrations**:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

7. **Start the development environment**:
   ```bash
   ./vendor/bin/sail up -d
   ```

8. **Build the frontend**:
   ```bash
   ./vendor/bin/sail npm run build
   ```

9. **Access the application**:
   - Open `http://localhost` in your browser.
   - API endpoints are available at `http://localhost/api`.

## API Testing

- Use **Postman** to test API endpoints with the `Authorization: Bearer <token>` header (obtained from `/api/register` or `/api/login`).
- Example requests:
  - **POST** `/api/register`:
    ```json
    {
        "name": "中村さん",
        "email": "test@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
    ```
    - Response: `201 Created`, `{ "token": "..." }`
  - **POST** `/api/todos`:
    ```json
    {
        "title": "テストTodo",
        "due_date": "2025-05-06 14:30:22",
        "description": "テスト説明"
    }
    ```
    - Response: `201 Created`, Todo data
  - **GET** `/api/todos`:
    - Response: `200 OK`, Array of user-specific todos

## Challenges and Solutions

- **Issue**: `Call to undefined method User::createToken()` in `AuthController`.
  - **Solution**: Added `HasApiTokens` trait to `User` model.
  - **Learning**: Understood Sanctum's token-based authentication and model traits.
- **Issue**: `Call to undefined method TodoController::middleware()` in `TodoController`.
  - **Solution**: Moved `auth:sanctum` middleware to `routes/api.php`.
  - **Learning**: Learned Laravel 12's middleware handling and route grouping.
- **Issue**: `Call to undefined method User::todos()` in `TodoController`.
  - **Solution**: Added `hasMany` relationship to `User` model.
  - **Learning**: Mastered Eloquent relationships (`hasMany`, `belongsTo`).
- **Issue**: Frontend validation errors (422) due to empty inputs.
  - **Solution**: Implemented client-side validation in `Todo.jsx`.
  - **Learning**: Improved UX with frontend validation and error handling.
- **Issue**: Slow build times (~20 minutes) with Sail.
  - **Solution**: Cleared Docker cache (`docker system prune -a`) and optimized WSL resources.
  - **Learning**: Gained insights into Docker resource management.

## Future Improvements

- Deploy to AWS Elastic Beanstalk for public access.
- Integrate Tailwind CSS for a polished, responsive design.
- Add unit tests with PHPUnit (backend) and Jest (frontend).
- Implement todo categories, sorting, and filtering options.
- Optimize API response times and frontend rendering.

## About Me

I am transitioning from an SIER dispatch role to a Web Engineer with 1.5 years of IT experience. This project demonstrates my ability to learn modern frameworks, build full-stack applications, and solve complex technical challenges. I am passionate about creating user-friendly, secure, and scalable web applications.

- **Contact**: jrojirojiro@live.jp
- **GitHub**: [jiro-nakamura](https://github.com/jiro-nakamura)

## License

MIT License