# School Management API

A Node.js REST API for managing school data with proximity-based sorting functionality. This API allows users to add new schools and retrieve schools sorted by distance from their current location.

## 🚀 Features

- **Add Schools**: Store school information with geographic coordinates
- **Proximity Search**: Get schools sorted by distance from user's location
- **Input Validation**: Comprehensive data validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled
- **MySQL Integration**: Robust database operations with connection pooling
- **RESTful Design**: Clean and intuitive API endpoints

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MySQL Server** (local or remote)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/madboy482/API_Testing
   cd API_Testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASS=your-database-password
   DB_NAME=your-database-name
   ```

4. **Database Setup:**
   - Create a MySQL database with the following schema:
   ```sql
   CREATE DATABASE IF NOT EXISTS school_db;
   USE school_db;

   CREATE TABLE IF NOT EXISTS schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(500) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check
**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "School Management API is running",
  "timestamp": "2025-07-02T10:30:00.000Z"
}
```

### Add School
**POST** `/api/addSchool`

Add a new school to the database.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurgaon, Haryana, India",
  "latitude": 28.4595,
  "longitude": 77.0266
}
```

**Success Response (201):**
```json
{
  "message": "School added successfully",
  "schoolId": 1,
  "data": {
    "name": "Delhi Public School",
    "address": "Sector 45, Gurgaon, Haryana, India",
    "latitude": 28.4595,
    "longitude": 77.0266
  }
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `address`: Required, non-empty string
- `latitude`: Required, number between -90 and 90
- `longitude`: Required, number between -180 and 180

### List Schools by Proximity
**GET** `/api/listSchools?latitude={lat}&longitude={lng}`

Retrieve all schools sorted by distance from the specified coordinates.

**Query Parameters:**
- `latitude` (required): User's latitude coordinate
- `longitude` (required): User's longitude coordinate

**Example Request:**
```
GET /api/listSchools?latitude=28.4595&longitude=77.0266
```

**Success Response (200):**
```json
{
  "message": "Schools retrieved successfully",
  "userLocation": {
    "latitude": 28.4595,
    "longitude": 77.0266
  },
  "totalSchools": 3,
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Gurgaon, Haryana, India",
      "latitude": 28.4595,
      "longitude": 77.0266,
      "distance": 0
    },
    {
      "id": 2,
      "name": "Ryan International School",
      "address": "Sector 40, Gurgaon, Haryana, India",
      "latitude": 28.4612,
      "longitude": 77.0821,
      "distance": 4.2
    }
  ]
}
```

## 🗂️ Project Structure

```
school-management-api/
├── app.js                          # Main application entry point
├── package.json                    # Project dependencies and scripts
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── README.md                      # Project documentation
├── School Management API.postman_collection.json  # Postman collection
├── config/
│   └── db.js                      # Database configuration
├── controllers/
│   └── schoolController.js        # Business logic for school operations
└── routes/
    └── schoolRoutes.js            # API route definitions
```

## 🧪 Testing

### Using Postman
1. Import the collection from `School Management API.postman_collection.json`
2. Set the base URL to `http://localhost:3000`
3. Run the requests in order:
   - Health Check
   - Add Schools (multiple examples)
   - List Schools with different coordinates

### Manual Testing with cURL

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Add School:**
```bash
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "Test Address",
    "latitude": 28.4595,
    "longitude": 77.0266
  }'
```

**List Schools:**
```bash
curl "http://localhost:3000/api/listSchools?latitude=28.4595&longitude=77.0266"
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_USER` | Database username | `root` |
| `DB_PASS` | Database password | `password123` |
| `DB_NAME` | Database name | `school_db` |

### Database Configuration
The application uses MySQL with connection pooling for optimal performance. The database configuration is in `config/db.js`.

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Starts with nodemon for auto-reload
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request