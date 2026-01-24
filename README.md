# iNotebook - Your NoteBook on the Cloud

iNotebook is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to let users securely manage their personal notes on the cloud. It features a robust authentication system, real-time updates, and a clean, responsive user interface.

## 🚀 Features

- **User Authentication**: Secure Sign Up and Login functionality using JWT (JSON Web Tokens).
- **CRUD Operations**: Create, Read, Update, and Delete notes seamlessly.
- **Categorization**: Tag your notes (e.g., Personal, Work, General) for better organization.
- **Secure Storage**: User data is isolated; you can only access your own notes.
- **Responsive Design**: Built with React and Bootstrap for a mobile-friendly experience.
- **Alert System**: Interactive alerts for user feedback on actions.

## 🛠️ Tech Stack

### Frontend
- **React.js**: Functional Component based UI.
- **Context API**: For global state management (Note Context).
- **React Router v6**: Client-side routing.
- **Bootstrap**: For styling and responsive layout.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing users and notes.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: For secure stateless authentication.
- **Bcrypt.js**: For password hashing.

## 📦 Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd inotebook
```

### 2. Setup Backend
Navigate to the Backend directory and install dependencies:
```bash
cd Backend
npm install
```

**Configuration**:
Ensure you have MongoDB running. By default, it connects to `mongodb://localhost:27017/inotebook`.
If you are using a `.env` file, ensure you have your `JWT_SECRET` and `MONGO_URI` defined.

### 3. Setup Frontend
Return to the root directory and install frontend dependencies:
```bash
cd ..
npm install
```

### 4. Run the Application
You can run both the backend and frontend simultaneously using the `both` script from the root directory:

```bash
npm run both
```
Or run them separately:

**Backend:**
```bash
cd Backend
nodemon index.js
```

**Frontend:**
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
