# Nudge Creation API

## Introduction
The Nudge Creation API allows users to create, read, update, and delete nudges for events or articles. Each nudge includes a title, image, scheduled date and time, and a brief description. Users can also add a one-line invitation icon to the nudge.

## Table of Contents
- [API Overview](#api-overview)
- [Data Model](#data-model)
- [Endpoints](#endpoints)
  - [Create a Nudge](#create-a-nudge)
  - [Retrieve a Specific Nudge](#retrieve-a-specific-nudge)
  - [Retrieve All Nudges](#retrieve-all-nudges)
  - [Update a Nudge](#update-a-nudge)
  - [Delete a Nudge](#delete-a-nudge)
- [Error Handling](#error-handling)
- [Conclusion](#conclusion)

## 1.API Overview
| HTTP Method | Endpoint         | Description                                |
|-------------|------------------|--------------------------------------------|
| POST        | /nudges          | Create a new nudge                         |
| GET         | /nudges/{id}     | Retrieve a specific nudge by ID            |
| GET         | /nudges          | Retrieve all nudges                        |
| PUT         | /nudges/{id}     | Update a specific nudge by ID              |
| DELETE      | /nudges/{id}     | Delete a specific nudge by ID              |

## 2.Data Model
**Nudge Object Model**:
```json
{
    "id": "string",
    "title": "string",
    "image": "url (string) or file",
    "scheduled_date": "string (YYYY-MM-DD)",
    "timings": "string (HH:MM to HH:MM)",
    "description": "string",
    "invitation_icon": "string"
}
```

## 3.Endpoints

### 3.1 Create a Nudge
- **Endpoint**: `/nudges`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "title": "string (required, max 60 characters)",
      "image_url": "string (optional)",
      "scheduled_date": "string (required, format: dd/mm/yyyy)",
      "timings": "string (required, format: hh:mm to hh:mm)",
      "description": "string (optional)",
      "invitation_icon": "string (optional)"
  }
  ```
 **Sucess**
 - **Code: 201 CREATED**
 - **Content**
   {
    "id": "string",
    "title": "string",
    "image_url": "string",
    "scheduled_date": "string",
    "timings": "string",
    "description": "string",
    "invitation_icon": "string"
}

**Error**
- **Code: 400 Bad Request**
- **Content**
  {
    "error": "Invalid input data"
}

### 3.2 Retrieve a Specific Nudge
- **Endpoint**: `/nudges/{id}`
- **Method** :`GET`

**Success Response**:
- **Code: 200 OK**
- **Content**:
{
    "id": "string",
    "title": "string",
    "image_url": "string",
    "scheduled_date": "string",
    "timings": "string",
    "description": "string",
    "invitation_icon": "string"
}

**Error Response**:
- **Code: 404 NOT FOUND**
- **Content**:
{
    "error": "Nudge not found"
}

### 3.3 Retrieve All Nudges
- **Endpoint**: `/nudges`
- **Method**: `GET`
  
**Success Response**:
- **Code: 200 OK**
- **Content**
  [
    {
        "id": "string",
        "title": "string",
        "image_url": "string",
        "scheduled_date": "string",
        "timings": "string",
        "description": "string",
        "invitation_icon": "string"
  },
    ...

]

### 3.4Update a Nudge
- **Endpoint**: `/nudges/{id}`
- **Method**: `PUT`
- **Request Body**:
{
    "title": "string (optional, max 60 characters)",
    "image_url": "string (optional)",
    "scheduled_date": "string (optional, format: dd/mm/yyyy)",
    "timings": "string (optional, format: hh:mm to hh:mm)",
    "description": "string (optional)",
    "invitation_icon": "string (optional)"
}

**Success Response**:
- **Code: 200 OK**
- **Content:**

{
    "id": "string",
    "title": "string",
    "image_url": "string",
    "scheduled_date": "string",
    "timings": "string",
    "description": "string",
    "invitation_icon": "string"
}

**Error Response**:
- **Code: 400 BAD REQUEST**
- **Content:**

{
    "error": "Invalid input data"
}
- **Code: 404 NOT FOUND**
- **Content:**
{
    "error": "Nudge not found"
}

### 3.5 Delete a Nudge
- **Endpoint**: `/nudges/{id}`
- **Method**: `DELETE`

**Success Response:**
- **Code: 200 NO CONTENT DOCUMENT DELETED SUCCESSFULLY**

**Error Response:**
- **Code: 404 NOT FOUND**
- **Content:**
{
    "error": "Nudge not found"
}

## 4.Error Handling
| Error Code | Description                    |
|------------|--------------------------------|
| 400        | Bad Request - Invalid input    |
| 401        | Unauthorized - Invalid API key |
| 404        | Not Found - Resource not found |
| 500        | Internal Server Error          |

## 5.Conclusion
The Nudge Creation API provides a simple and efficient way for users to create and manage event nudges. It supports essential CRUD operations and offers flexibility through optional fields, allowing users to customize their nudges as needed.

