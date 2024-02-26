# Assignment - 4: Event Management

## Features
1. **User Registration:**
   - Created a registration page where users can sign up by providing a username, password, and any other required information
   - Hashed Password
   - Unique Username

2. **User Login:**
   - Created a login page.
   - Hashed Password check.
   - hashPassword === hashPassword -> redirect `Main Page`

3. **Authentication Middleware:**
   - Protect routes that require authentication
   - Redirect if `user` not in `session`
   
4. **Authorization:**
   - Define user roles or permissions such as `admin` or `regular user` and stores roles in database
   - In login page check user's role. If everything 'true' redirect 'user' to `admin panel`
   
5. **REST API:**
   - Admin can add, read, update and delete `CRUD`
   - `CRUD` working for users and events
   - Carousel feature implemented from `Bootstrap 5` used in `admin panel` and `main page`
   - Admin can watch in 2 languages, User can choose language by dropdown button
6. **APIs:**
   - `Unsplash API KEY` used

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set environment variables for API keys.
4. Run the server using `npm start`.

## API Usage
- Provide instructions for API usage.
- Document endpoints and expected responses.
- create `.env` file into directory 
```bash
    PORT=3000
    mongoURI=YOUR-MONGODB-ATLAS
    SESSION_SECRET=ANY-WORD
    UNSPLASH_API_KEY=YOUR-API
```

## Admin Username and Password
- Admin username: Nurdaulet
- Admin password: In moodle

## Project Contributors
- Nurdaulet, Group SE-2201

## Links
- **Deployed Link:** 
- **GitHub Repository:** https://github.com/ornur/
