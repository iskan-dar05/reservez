# 🏨 Reservez - Hotel Booking & Management Platform

Reservez is a full-stack hotel booking platform that allows users to search, book hotels, chat with owners, and manage reservations. It also includes an admin dashboard for user and booking management. The system supports authentication (JWT + Google OAuth), real-time chat (Socket.io), email notifications, and file uploads.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Passport.js (Google OAuth 2.0)
- Socket.io (Real-time chat & notifications)
- Multer (File uploads)
- Nodemailer (Email notifications)
- Express Validator
- bcrypt.js

### Frontend
- Vue / React (frontend folder)
- Axios
- Tailwind / UI framework (assumed)

---

## 📁 Project Structure


```
reservez/
│
├── backend/
│ ├── config/ # DB, mail, passport, multer config
│ ├── controllers/ # Business logic (Auth, Admin, Hotel, Chat, Booking, User)
│ ├── middlewares/ # Auth middleware & error handler
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── utils/ # JWT, socket utils
│ ├── uploads/ # Uploaded images
│ ├── server.js # Entry point
│
├── frontend/ # Client application
```

```

---

## ⚙️ Installation

### 1. Clone the project
```bash
git clone https://github.com/your-repo/reservez.git
cd reservez
```

2. Backend setup

```
cd backend
npm install
```

Create .env file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLIENT_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```
Run backend:
```
npm run dev
```

3. Frontend setup

```
cd frontend
npm install
npm run dev
```

# 🔐 Authentication System
- JWT-based authentication
- Google OAuth login via Passport.js
- Token stored in DB (logout invalidation supported)
- Role-based access (admin / user / owner)


# 🧠 Main Features
# 👤 User Features
- Register / Login
- Google Login
- Update profile
- Favorite hotels
- Book hotels & rooms
- Cancel bookings
- Chat with hotel owners
- Email verification
- Password reset via email

# 🏨 Hotel Features
- Create hotel (with images)
- Add / update / delete rooms
- Upload multiple images (Multer)
- Add comments & ratings
- Search hotels (price, location, rating, room type)
- Suggest top-rated hotels

# 📅 Booking System
- Create booking request
- Confirm / cancel bookings
- Email notifications for booking updates
- Real-time notification via Socket.io

# 💬 Chat System
- Customer ↔ Owner chat
- Real-time messaging
- Chat room creation
- Message history stored in MongoDB

# 🧑‍💼 Admin Panel
- Admin login
- Manage users
- block / activate users
- delete users
- View all bookings
- Monitor system data


# 📡 API Routes Overview
# Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/google
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- Users
- GET /api/users
- PUT /api/users/:id
- DELETE /api/users/:id
- POST /api/users/favorite/:id
- Hotels
- GET /api/hotels
- POST /api/hotels
- PUT /api/hotels/:id
- DELETE /api/hotels/:id
- Bookings
- POST /api/books
- PUT /api/books/confirm
- PUT /api/books/cancel
- Chat
- POST /api/chat
- POST /api/chat/message
- GET /api/chat/:id
# 🔄 Real-time Features (Socket.io)
- New booking notifications
- Chat messaging
- User block notifications
- Hotel owner alerts
# 📧 Email System

Uses Nodemailer with Gmail:

- Account verification
- Password reset
- Booking confirmation
- Account status updates
# 🔒 Security
- Password hashing (bcrypt)
- JWT token validation
- Role-based middleware protection
- Token blacklist system (logout)
- Input validation (express-validator)
# 🧪 Future Improvements
- Payment integration (Stripe / PayPal)
- Advanced recommendation system
- Mobile app (React Native / Ionic)
- AI-based hotel suggestions
- Review moderation system
# 👨‍💻 Author

# Iskandar Boukhenoufa

- GitHub: https://github.com/iskan-dar05

- Email: iskandarboukhenoufa23@gmail.com

# 📜 License

MIT