# Nakamura Todo API

This is a RESTful API built with **Laravel** for managing Todo items, integrated with a MySQL database using Laravel Sail (Docker). Developed as part of my transition from an SIER dispatch role to a Web Engineer, this project showcases my ability to build backend APIs, troubleshoot complex issues, and work with modern development environments.

## Features
- **RESTful API Endpoints**:
  - `GET /api/todos`: Retrieve all todos.
  - `POST /api/todos`: Create a new todo.
  - `GET /api/todos/{id}`: Retrieve a specific todo.
  - `PUT/PATCH /api/todos/{id}`: Update a todo.
  - `DELETE /api/todos/{id}`: Delete a todo.
- **Validation**: Input validation for title, due date, and description.
- **Database**: MySQL with Eloquent ORM for data management.
- **Environment**: Laravel Sail (Docker) for consistent development.

## Tech Stack
- **Backend**: Laravel 10.x, PHP 8.x
- **Database**: MySQL
- **Environment**: Laravel Sail, Docker
- **Testing**: Postman for API testing
- **Future Plan**: Integration with a React frontend (in progress)

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone git@github.com:jiro-nakamura/nakamura-todo.git
   cd nakamura-todo

   Install dependencies:

composer install



Set up environment:





Copy .env.example to .env and configure DB_* settings.

cp .env.example .env



Generate application key:

php artisan key:generate



Run migrations:

php artisan migrate



Start the server:

php artisan serve





API will be available at [invalid url, do not cite].

API Testing





Use Postman to test endpoints.



Example POST /api/todos:

{
    "title": "Test Todo",
    "due_date": "2025-05-06",
    "description": "Test description"
}

Challenges and Solutions





Issue: API routes (api/todos) were not registering, returning 404 errors.



Solution: Debugged RouteServiceProvider, fixed missing service providers (AuthServiceProvider, EventServiceProvider), and cleared cache.



Learning: Gained deep understanding of Laravel's routing, service providers, and Docker-based environments.

Future Improvements





Integrate with a React frontend for a full-stack Todo app.



Add authentication (Sanctum) for secure API access.



Implement unit tests with PHPUnit.

About Me

I am transitioning from an SIER dispatch role to a Web Engineer. This project demonstrates my ability to learn, troubleshoot, and deliver functional APIs. Contact: jrojirojiro@live.jp

License

MIT License