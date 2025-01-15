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

### 3. Express Interest in Gig

**Endpoint:**
```
POST /api/v1/express_interest
```

**Description:**
Allows a user to express interest in a specific gig.

**Request Body:**
```json
{
  "gig_id": "12345"
}
```

**Headers:**
- `user_id` (required): The ID of the user expressing interest.

**Response:**
```json
{
  "message": "Interest expressed successfully",
  "engagement_id": "engagement123"
}
```

**Status Codes:**
- 201 Created: Interest successfully expressed.
- 404 Not Found: Gig or user not found.
- 400 Bad Request: User has already expressed interest.

---

### 4. Update Gig Engagement Status

**Endpoint:**
```
PATCH /api/v1/update_gig_engagement
```

**Description:**
Updates the status of a user's engagement in a gig.

**Request Body:**
```json
{
  "gig_id": "12345",
  "status": "completed"
}
```

**Response:**
```json
{
  "message": "Gig status updated successfully",
  "engagement": {
    "gig_id": "12345",
    "user_id": "user123",
    "status": "completed"
  }
}
```

**Status Codes:**
- 200 OK: Engagement status updated successfully.
- 404 Not Found: Engagement not found.
- 400 Bad Request: Invalid gig ID or status.

---

### 5. Get Interested Users

**Endpoint:**
```
GET /api/v1/gig/:gig_id/interested
```

**Description:**
Fetches a list of users who expressed interest in a specific gig.

**Path Parameters:**
- `gig_id` (required): The ID of the gig.

**Response:**
```json
{
  "message": "List of users who showed interest in the gig",
  "gig_id": "12345",
  "interestedUsers": [
    {
      "user_id": "user123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "status": "interested"
    },
    {
      "user_id": "user234",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "status": "interested"
    }
  ]
}
```

**Status Codes:**
- 200 OK: Successfully retrieved interested users.
- 404 Not Found: No users found who expressed interest.

---

### 6. Update Gig Status

**Endpoint:**
```
PATCH /api/v1/update_gig
```

**Description:**
Updates the status of an existing gig to a new state.

**Request Body:**
```json
{
  "gig_id": "12345",
  "status": "paused"
}
```

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

--- 

### 7. Fetch Gig by ID

**Endpoint:**
```
GET /api/v1/gigs/:gig_id
```

**Description:**
Fetches details of a single gig by its ID.

**Path Parameters:**
- `gig_id`: (required) The ID of the gig.

**Response:**
Details of the specified gig, including collaborators.

**Response Example:**
```json
{
  "gig": {
    "_id": "12345",
    "topic": "Web Development",
    "description": "Build a portfolio website",
    "title": "Portfolio Website",
    "ustar_category": "SuperStar",
    "email": "poster1@vq.com",
    "manager_id": "user123",
    "collaborators": [
      {
        "_id": "user234",
        "name": "Collaborator Name",
        "email": "collaborator@example.com"
      }
    ],
    "status": "awaiting_admin_approval"
  }
}
```

**Status Codes:**
- 200 OK: Successfully fetched the gig.
- 404 Not Found: Gig not found.

---

### 8. Update Gig Details

**Endpoint:**
```
PATCH /api/v1/gigs/:gig_id
```

**Description:**
Updates the details of an existing gig. Only the provided fields will be updated.

**Request Body:**
```json
{
  "topic": "Updated Topic",
  "description": "Updated Description",
  "title": "Updated Title",
  "ustar_category": "NovaStar"
}
```

**Response:**
```json
{
  "message": "Gig updated successfully",
  "gig": {
    "_id": "12345",
    "topic": "Updated Topic",
    "description": "Updated Description",
    "title": "Updated Title",
    "ustar_category": "NovaStar",
    "email": "poster1@vq.com",
    "manager_id": "user123",
    "status": "awaiting_admin_approval"
  }
}
```

**Status Codes:**
- 200 OK: Successfully updated the gig.
- 400 Bad Request: Invalid or missing data.
- 404 Not Found: Gig not found.

---

### 9. Add Collaborator to Gig

**Endpoint:**
```
PATCH /api/v1/gigs/:gig_id/collaborators
```

**Description:**
Adds a collaborator (must be a manager) to a gig.

**Request Body:**
```json
{
  "collaborator_id": "user234"
}
```

**Response:**
```json
{
  "message": "Collaborator added successfully",
  "gig": {
    "_id": "12345",
    "collaborators": [
      {
        "_id": "user234",
        "name": "Collaborator Name",
        "email": "collaborator@example.com"
      }
    ]
  }
}
```

**Status Codes:**
- 200 OK: Collaborator added successfully.
- 400 Bad Request: Invalid collaborator or user is not a manager.
- 404 Not Found: Gig not found.

---

### 10. Get Interested Gigs

**Endpoint:**
```
GET /api/v1/intrested_gigs
```

**Description:**
Fetches all the gigs where a user has shown interest. Each gig includes details of the manager associated with it, retrieved from the `User` model.

**Headers:**
- `user_id` (required): The ID of the user to fetch interested gigs for.

**Response Example:**
```json
{
  "message": "Interested gigs fetched successfully",
  "gigs": [
    {
      "_id": "gig123",
      "topic": "Web Development",
      "description": "Build a portfolio website",
      "title": "Portfolio Website",
      "ustar_category": "SuperStar",
      "status": "awaiting_admin_approval",
      "manager_details": {
        "_id": "manager123",
        "name": "John Doe",
        "email": "manager@example.com",
        "profile_picture_url": "https://example.com/profile.jpg"
      }
    },
    {
      "_id": "gig456",
      "topic": "Graphic Design",
      "description": "Design a company logo",
      "title": "Logo Design",
      "ustar_category": "NovaStar",
      "status": "awaiting_admin_approval",
      "manager_details": {
        "_id": "manager234",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "profile_picture_url": "https://example.com/profile2.jpg"
      }
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved interested gigs.
- `400 Bad Request`: Missing or invalid `user_id`.
- `404 Not Found`: No interested gigs found for the user.

---