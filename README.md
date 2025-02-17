# Todo API - NestJS Backend

This is a simple Todo API built with **NestJS** that allows you to perform CRUD operations on tasks (todos). The API provides endpoints to create, read, update, and delete todo items.

---

## **Base URL:https://todo-nest-2smq.vercel.app/todo**

All API requests are relative to the base URL:

---

## **Endpoints**

### 1. **Create a New Todo**

**POST** `/todo`

Create a new todo item.

#### Request Body:

```json
{
  "title": "string", // Required: The title of the todo.
  "description": "string", // Required: A brief description of the todo item.
  "completed": "boolean" // Optional: Whether the todo is completed or not. Default is false.
}
```

**GET** `/todo`

Get all todos.

#### Request Body:

```json

```

**PATCH** `/todo/id`

Get all todos.

#### Request Body:

```json
{
  "title": "Learn NestJS - Updated",
  "description": "Complete the NestJS documentation and build projects",
  "completed": true
}
```

**DELETE** `/todo/id`

Delete todos.

#### Request Body:

```json

```
