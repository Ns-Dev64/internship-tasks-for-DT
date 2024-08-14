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
- [Authentication and Authorization](#authentication-and-authorization)
- [Error Handling](#error-handling)
- [Versioning](#versioning)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)
- [Conclusion](#conclusion)

## API Overview
| HTTP Method | Endpoint         | Description                                |
|-------------|------------------|--------------------------------------------|
| POST        | /nudges          | Create a new nudge                         |
| GET         | /nudges/{id}     | Retrieve a specific nudge by ID            |
| GET         | /nudges          | Retrieve all nudges                        |
| PUT         | /nudges/{id}     | Update a specific nudge by ID              |
| DELETE      | /nudges/{id}     | Delete a specific nudge by ID              |

## Data Model
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

## Endpoints

### Create a Nudge
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
 
