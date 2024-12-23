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
