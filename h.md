### Updated API Documentation

---

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

*(Details remain unchanged)*

---

### 2. Create Gig

**Endpoint:**
```
POST /api/v1/create_gig
```

*(Details remain unchanged)*

---

### 3. Express Interest in Gig

**Endpoint:**
```
POST /api/v1/express_interest
```

*(Details remain unchanged)*

---

### 4. Update Gig Engagement Status

**Endpoint:**
```
PATCH /api/v1/update_gig_engagement
```

*(Details remain unchanged)*

---

### 5. Get Interested Users

**Endpoint:**
```
GET /api/v1/gig/:gig_id/interested
```

*(Details remain unchanged)*

---

### 6. Update Gig Status

**Endpoint:**
```
PATCH /api/v1/update_gig
```

*(Details remain unchanged)*

---

### 7. Fetch Gig by ID

**Endpoint:**
```
GET /api/v1/gigs/:gig_id
```

*(Details remain unchanged)*

---

### 8. Update Gig Details

**Endpoint:**
```
PATCH /api/v1/gigs/:gig_id
```

*(Details remain unchanged)*

---

### 9. Add Collaborator to Gig

**Endpoint:**
```
PATCH /api/v1/gigs/:gig_id/collaborators
```

*(Details remain unchanged)*

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