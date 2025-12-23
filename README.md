# Comment System - Full Stack Application

A full-stack comment system with Django REST Framework backend (PostgreSQL) and React.js frontend.

## Features

### Backend (Django REST API)
- List all comments
- Add new comments (from "Admin" user with current timestamp)
- Edit existing comments
- Delete comments
- PostgreSQL database backend
- CORS enabled for React frontend

### Frontend (React.js)
- Clean, modern UI with gradient design
- Display comments with author, date, likes, and images
- **Add new comments** with form interface
- **Edit comments** with inline editing
- **Delete comments** with confirmation dialog
- Responsive design for mobile and desktop
- Loading states and error handling
- Real-time data fetching and updates from backend API

## Prerequisites

- Python 3.x
- PostgreSQL 15+
- pip and virtualenv
- Node.js 14+ and npm

## Setup Instructions

### 1. Install PostgreSQL

**On macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

### 2. Create Database

```bash
# On macOS (Homebrew installation)
/usr/local/opt/postgresql@15/bin/createdb comments_db

### 3. Set Up Python Environment

# Create virtual environment
python3.10 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install/reinstall all dependencies
pip install -r requirements.txt

### 4. Configure Database Connection

Update the `comment_api/settings.py` file with your database credentials:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "comments_db",
        "USER": "your_username",  # Change to your PostgreSQL username
        "PASSWORD": "",  # Add password if needed
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Load Sample Data

```bash
python manage.py load_comments
```

This will load the sample comments from `comments.json` into the database.

### 7. Start the Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/comments/`

## API Endpoints

### List All Comments
```bash
GET http://localhost:8000/api/comments/
```

### Get Single Comment
```bash
GET http://localhost:8000/api/comments/{id}/
```

**Example:**
```bash
curl http://localhost:8000/api/comments/1/
```

### Add New Comment
```bash
POST http://localhost:8000/api/comments/
Content-Type: application/json

{
  "text": "Your comment text here",
  "likes": 0,
  "image": "https://example.com/image.png"  // optional
}
```

**Note:** The author is automatically set to "Admin" and date is set to current timestamp.

**Example:**
```bash
curl -X POST http://localhost:8000/api/comments/ \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a new comment!", "likes": 0}'
```

### Edit Comment (Full Update)
```bash
PUT http://localhost:8000/api/comments/{id}/
Content-Type: application/json

{
  "author": "Admin",
  "text": "Updated comment text",
  "likes": 10,
  "image": ""
}
```

**Example:**
```bash
curl -X PUT http://localhost:8000/api/comments/1/ \
  -H "Content-Type: application/json" \
  -d '{"author": "Admin", "text": "Updated text", "likes": 10, "image": ""}'
```

### Edit Comment (Partial Update)
```bash
PATCH http://localhost:8000/api/comments/{id}/
Content-Type: application/json

{
  "text": "Updated comment text"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:8000/api/comments/1/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated text only"}'
```

### Delete Comment
```bash
DELETE http://localhost:8000/api/comments/{id}/
```

**Example:**
```bash
curl -X DELETE http://localhost:8000/api/comments/1/
```

### Using Browser

You can also test the API using Django REST Framework's browsable API interface by navigating to:
- `http://localhost:8000/api/comments/` in your web browser

## React Frontend Setup

The project includes a React.js frontend that displays the comments in a clean, modern interface.

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the React Development Server

**IMPORTANT:** Make sure the Django backend is running on `http://localhost:8000` before starting the React app.

```bash
npm start
```

The React app will open automatically at `http://localhost:3001`

### What You'll See

- **Header**: "Comments" with a subtitle "Discussions from the community"
- **Comments List**: All comments from the database displayed as cards
- **Each Comment Card Shows**:
  - Author name and avatar (or initials if no image)
  - Comment date (formatted)
  - Comment text
  - Likes count with icon

### Features

- **Add Comments**: Form interface to add new comments as Admin with current timestamp
- **Edit Comments**: Click Edit button to edit comment text inline
- **Delete Comments**: Click Delete button with confirmation dialog
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading State**: Shows a spinner while fetching data
- **Error Handling**: Displays errors with a retry button if API fails
- **Hover Effects**: Cards lift up slightly on hover
- **Clean Design**: Modern gradient background with card-based layout

### Testing the Frontend

1. **Start both servers**:
   - Terminal 1: Django backend (`python manage.py runserver`)
   - Terminal 2: React frontend (`npm start` in frontend directory)

2. **View the comments**: Open `http://localhost:3001` in your browser

3. **Add a comment**: Use the form at the top to add a new comment

4. **Edit a comment**: Click the Edit button on any comment, make changes, and save

5. **Delete a comment**: Click the Delete button and confirm

6. **Test responsiveness**: Resize your browser window to see mobile/tablet layouts


## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Stopping PostgreSQL

```bash
# On macOS (Homebrew)
brew services stop postgresql@15

