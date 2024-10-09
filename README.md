### Base URL
```
/api/v1
```

---

### 1. Get Gigs

**Endpoint:**
```
GET /api/v1/gigs
```

**Description:**
Fetches a list of gigs with pagination and optional filters.

**Query Parameters:**
- `page`: (optional, default = 1) The page number for pagination.
- `limit`: (optional, default = 10) The number of gigs per page.
- `topic`: (optional) Filter by the topic of the gig.
- `ustar_category`: (optional) Filter by Ustar reward category.

**Response:**
A list of gigs with details including the topic, description, title, Ustar category, and the person who posted it.

**Response Example:**
```json
{
  "page": 1,
  "limit": 10,
  "total_gigs": 50,
  "gigs": [
    {
      "topic": "Web Development",
      "description": "Build a portfolio website",
      "title": "Portfolio Website",
      "ustar_category": "5-star",
      "email": "poster1@vq.com"
    },
    {
      "topic": "Graphic Design",
      "description": "Design a company logo",
      "title": "Logo Design",
      "ustar_category": "4-star",
      "email": "poster2@vq.com"
    }
  ]
}
```

**Status Codes:**
- 200 OK: Successfully fetched the gigs.
- 400 Bad Request: Invalid filter or pagination parameters.

---

### 2. Create Gig

**Endpoint:**
```
POST /api/v1/create_gig
```

**Description:**
Creates a new gig by taking in details such as topic, description, title, Ustar category, and the user's email and ID.

**Request Body:**
```json
{
  "topic": "Web Development",
  "description": "Build a portfolio website",
  "title": "Portfolio Website",
  "ustar_category": "5-star",
  "email": "poster1@vq.com"
}
```

**Response:**
```json
{
  "message": "Gig created successfully",
  "gig_id": "123456"
}
```

**Status Codes:**
- 201 Created: Successfully created the gig.
- 400 Bad Request: Missing or invalid input.

---

### 3. Gig Intent

**Endpoint:**
```
POST /api/v1/gig_intent
```

**Description:**
This endpoint allows a gig worker to show their intent to perform a gig. It will trigger a webhook to notify the person who posted the gig. The gig intent data will be stored in the database with the gig status as "intended."

**Request Body:**
```json
{
  "gig_id": "12345",
  "user_id": "worker123"
}
```

**Webhook Notification:**
The webhook will notify the gig poster with the following payload:
```json
{
  "gig_id": "12345",
  "worker_id": "worker123",
  "message": "A worker has shown interest in your gig"
}
```

**Response:**
```json
{
  "message": "Intent recorded and notification sent."
}
```

**Status Codes:**
- 200 OK: Intent successfully recorded and webhook triggered.
- 404 Not Found: Gig not found.

---

### 4. View Posted Gigs

**Endpoint:**
```
GET /api/v1/gig_status
```

**Description:**
Allows a gig poster to view the gigs they have posted along with the current status (e.g., intended, completed).

**Query Parameters:**
- `user_id`: The ID of the user posting the gig.

**Response Example:**
```json
{
  "user_id": "poster1",
  "posted_gigs": [
    {
      "gig_id": "12345",
      "title": "Portfolio Website",
      "status": "intended",
      "intended_by": [
        "worker123",
        "worker234"
      ]
    },
    {
      "gig_id": "12346",
      "title": "Logo Design",
      "status": "open"
    }
  ]
}
```

**Status Codes:**
- 200 OK: Successfully retrieved posted gigs.
- 404 Not Found: No gigs found for the user.

---

### 5. Create Profile

**Endpoint:**
```
POST /api/v1/create_profile
```

**Description:**
Creates a user profile on the GigWorks platform. This will store the user's basic details, such as name, email, skills, bio, and a profile picture URL.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "skills": ["Web Development", "Graphic Design"],
  "bio": "Experienced developer with a focus on web technologies and design.",
  "profile_picture_url": "https://example.com/profile/johndoe.jpg"
}
```

**Request Fields:**
- `name`: (required) The full name of the user.
- `email`: (required) The user's email address.
- `skills`: (optional) A list of the user's skills.
- `bio`: (optional) A short bio or description of the user.
- `profile_picture_url`: (optional) URL to the user's profile picture.

**Response:**
```json
{
  "message": "Profile created successfully",
  "profile_id": "user12345"
}
```

**Status Codes:**
- 201 Created: The profile was created successfully.
- 400 Bad Request: Missing or invalid input (e.g., missing required fields like name or email).

**Error Example:**
```json
{
  "error": "Email is required"
}
```

---

### 6. Update Gig Status

**Endpoint:**
```
PATCH /api/v1/update_gig
```

**Description:**
Updates the status of an existing gig to a new state. This can be used to change the gig's status to "paused" or any other relevant state.

**Request Body:**
```json
{
  "gig_id": "12345",
  "status": "paused"
}
```

**Request Fields:**
- `gig_id`: (required) The ID of the gig to be updated.
- `status`: (required) The new status of the gig. In this case, it should be "paused", but other states like "open" or "completed" could also be supported depending on the platform's needs.

**Response:**
```json
{
  "message": "Gig status updated successfully",
  "gig_id": "12345",
  "new_status": "paused"
}
```

**Status Codes:**
- 200 OK: The gig's status was successfully updated.
- 400 Bad Request: Missing or invalid gig ID or status.
- 404 Not Found: The specified gig ID was not found.

**Error Example:**
```json
{
  "error": "Gig not found"
}
```

---

